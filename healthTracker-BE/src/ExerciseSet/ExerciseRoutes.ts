import { Router } from 'express';
import { exerciseSetController } from './index.js';

export const exerciseSetRoutes = Router();

exerciseSetRoutes.get('/', exerciseSetController.getAllNested);
exerciseSetRoutes.post('/save', exerciseSetController.saveEntity);
