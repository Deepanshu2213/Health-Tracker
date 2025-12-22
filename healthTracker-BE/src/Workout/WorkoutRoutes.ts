import { Router } from 'express';
import { workoutController } from './index.js';
import { graphqlHTTP } from 'express-graphql';
import { graphqlSchema } from './graphql/workoutQuery.js';
export const WorkoutRoutes = Router();

WorkoutRoutes.get('/', workoutController.getAllNested);
WorkoutRoutes.post('/save', workoutController.saveEntity);
WorkoutRoutes.get('/findAll', workoutController.getAllNested);
WorkoutRoutes.get('/current', workoutController.getCurrentWorkout);
WorkoutRoutes.get('/analytics', workoutController.getWorkoutAnalytics);

WorkoutRoutes.use(
  '/graphql',
  graphqlHTTP((req, res) => ({
    schema: graphqlSchema,
    graphiql: true,
    context: { req, res },
  }))
);
