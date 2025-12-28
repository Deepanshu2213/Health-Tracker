import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
} from 'graphql';
//import { User } from '../../User/models/User.js';
import { workoutService } from '../index.js';
import { Op } from 'sequelize';
const WorkoutGraphQl = new GraphQLObjectType({
  name: 'Workout',
  fields: () => ({
    id: { type: GraphQLInt },
    createdAt: {
      type: GraphQLString,
      resolve: (workout) => {
        const date = workout.get('createdAt');
        return date.toISOString();
      },
    },
    updatedAt: { type: GraphQLString },
  }),
});

const WorkoutStatsViewGraphQl = new GraphQLObjectType({
  name: 'WrokoutStatsView',
  fields: () => ({
    userId: { type: GraphQLInt },
    total_workouts: { type: GraphQLInt },
    this_month: { type: GraphQLInt },
    current_streak: { type: GraphQLInt },
    max_streaks: { type: GraphQLInt },
    // max_weight: {
    //   type: GraphQLInt,
    //   resolve: async (parent, args, context, info) => {
    //     const userId = parent.userId;
    //     return await User.max({
    //     })
    //   },
    // },
  }),
});

const workoutQuery = new GraphQLObjectType({
  name: 'rootquery',
  fields: {
    getWorkout: {
      type: new GraphQLList(WorkoutGraphQl),
      args: {
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString },
      },
      resolve: async (_parent, args, context) => {
        const { req, res } = context;
        const userId = req.user.id;
        let { startDate, endDate } = args;
        startDate = startDate ? new Date(startDate) : undefined;
        endDate = endDate ? new Date(endDate) : undefined;
        return await workoutService.getAllEntity({
          where: {
            createdAt: { [Op.gte]: startDate, [Op.lte]: endDate },
            userId: userId,
          },
        });
      },
    },
    getAllWorkout: {
      type: new GraphQLList(WorkoutGraphQl),
      resolve: async () => {
        return await workoutService.getAllEntity();
      },
    },
    getStats: {
      type: new GraphQLList(WorkoutStatsViewGraphQl),
      args: {
        startDate: { type: GraphQLString },
      },
      resolve: async (_parent, args, context) => {
        const { req, res } = context;
        const userId = req.user.id;
        let { startDate } = args;
        startDate = new Date(startDate); //
        startDate.setFullYear(startDate.getFullYear() - 1);
        const endDate = new Date();
        const workouts = await workoutService.getAllEntity({
          where: {
            createdAt: { [Op.gte]: startDate, [Op.lte]: endDate },
            userId: userId,
          },
          order: [['createdAt', 'ASC']],
        });
        const n = workouts.length;
        let streak = 0;
        let total_workouts = n,
          this_month = 0,
          current_streak = 0,
          max_streaks = 0;
        if (n == 1) {
          let currDate = new Date(workouts[0]?.get('createdAt') || '');
          currDate.setHours(0, 0, 0, 0);
          let today = new Date();
          today.setHours(0, 0, 0, 0);
          if (
            (today.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24) ==
            0
          ) {
            this_month++, current_streak++, max_streaks++;
          }
        }
        for (let i = 1; i < n; i++) {
          let prevDate = new Date(workouts[i - 1]?.get('createdAt') || '');
          prevDate.setHours(0, 0, 0, 0);
          let currDate = new Date(workouts[i]?.get('createdAt') || '');
          currDate.setHours(0, 0, 0, 0);
          const diff =
            (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);
          if (diff == 1) {
            streak++;
          } else if (diff == 0) {
          } else {
            streak = 1;
          }
          if ([0, 1].includes(endDate.getDate() - currDate.getDate())) {
            current_streak = Math.max(streak, current_streak);
          }
          max_streaks = Math.max(streak, max_streaks);
          if (
            currDate.getFullYear() === endDate.getFullYear() &&
            currDate.getMonth() === endDate.getMonth()
          ) {
            this_month++;
          }
        }
        return [
          {
            userId: userId,
            total_workouts,
            this_month,
            current_streak,
            max_streaks,
          },
        ];
      },
    },
  },
});

export const graphqlSchema = new GraphQLSchema({
  query: workoutQuery,
});
