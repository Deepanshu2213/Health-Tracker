import express from 'express';
// import mongoose from 'mongoose';
// import UserRoutes from './old/routes/login.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { checkAuth } from './middlewares/authMiddleware.js';
import loginProtectedRoutes from './old/routes/loginProtected.js';
import userRoutes from './User/routes/UserRoutes.js';
import { exerciseRoutes } from './Exercise/routes/exercise.routes.js';
import { exerciseSetRoutes } from './ExerciseSet/ExerciseRoutes.js';
import { WorkoutRoutes } from './Workout/WorkoutRoutes.js';
const app = express();

import { sequelize } from './config/db.js';
import { setRoutes } from './Set/setRoutes.js';
import { errorHandler } from './middlewares/errorMiddleware.js';
app.use(bodyParser.json());
app.use(cookieParser());

try {
  //await mongoose.connect('mongodb://0.0.0.0:27017/healtCenter');
  await sequelize.sync({ alter: true });
  //await sequelize.drop({ cascade: true });
  //await sequelize.sync({ force: true });

  //app.use('/user', UserRoutes);
  app.use('/user', userRoutes);
  app.use(checkAuth);
  app.use('/exercise', exerciseRoutes);
  app.use('/user', loginProtectedRoutes);
  app.use('/exerciseSet', exerciseSetRoutes);
  app.use('/set', setRoutes);
  app.use('/workout', WorkoutRoutes);
  app.listen(8080, () => {
    console.log('Hi server started');
  });
  app.use(errorHandler);
} catch (err) {
  console.log(err);
  process.exit(1);
}
