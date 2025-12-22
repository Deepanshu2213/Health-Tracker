import { Router } from 'express';
import { exerciseSetController } from './index.js';
import { exerciseRoutes } from '../Exercise/routes/exercise.routes.js';

export const exerciseSetRoutes = Router();

exerciseSetRoutes.get('/', exerciseSetController.getAllNested);
exerciseSetRoutes.post('/save', exerciseSetController.saveEntity);
exerciseSetRoutes.get('/find/:id', exerciseSetController.getEntityById);
