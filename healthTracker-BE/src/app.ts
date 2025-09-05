import express from 'express';
import mongoose from 'mongoose';
const app = express();
import UserRoutes from './routes/login.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { checkAuth } from './middlewares/authMiddleware.js';
app.use(bodyParser.json());
app.use(cookieParser());

try {
  await mongoose.connect('mongodb://0.0.0.0:27017/healtCenter');
  app.use('/user', UserRoutes);
  app.use(checkAuth);
  app.listen(8080, () => {
    console.log('Hi server started');
  });
} catch (err) {
  console.log(err);
}
