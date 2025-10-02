import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
} from 'graphql';
import { Workout } from '../models/Workout.js';
import { Op } from 'sequelize';
const WorkoutGraphQl = new GraphQLObjectType({
  name: 'Workout',
  fields: () => ({
    id: { type: GraphQLInt },
    createdAt: {
      type: GraphQLString,
      resolve: (workout) => workout.createdAt.setHours(0, 0, 0, 0),
    },
    updatedAt: { type: GraphQLString },
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
      resolve: async (_parent, args) => {
        let { startDate, endDate } = args;
        startDate = startDate ? new Date(startDate) : undefined;
        endDate = endDate ? new Date(endDate) : undefined;
        endDate.setHours(23, 59, 59, 59);
        return await Workout.findAll({
          where: {
            createdAt: { [Op.gte]: startDate, [Op.lte]: endDate },
          },
        });
      },
    },
    getAllWorkout: {
      type: new GraphQLList(WorkoutGraphQl),
      resolve: async () => {
        return await Workout.findAll();
      },
    },
  },
});

export const graphqlSchema = new GraphQLSchema({
  query: workoutQuery,
});
