import express from 'express';
import { checkToken } from '../controllers/loginController.js';
const Router = express.Router();

Router.get('/checkToken', checkToken);

export default Router;
