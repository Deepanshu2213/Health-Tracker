import express from 'express';

const Router = express.Router();
import { userController } from '../index.js';

Router.post('/login', userController.login);
Router.post('/save', userController.saveEntity);
//Router.get('/checkToken', checkToken);

export default Router;
