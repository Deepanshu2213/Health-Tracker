import express from 'express';
import { saveUser, login } from '../controllers/loginController.js';
const Router = express.Router();

Router.post('/login', login);
Router.post('/save', saveUser);
//Router.get('/checkToken', checkToken);

export default Router;
