import { Router } from 'express';
import { exerciseController } from '../index.js';
export const exerciseRoutes = Router();
exerciseRoutes.get('/', exerciseController.getAllEntity);
exerciseRoutes.post('/save', exerciseController.saveEntity);
