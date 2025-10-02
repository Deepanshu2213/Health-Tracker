import { Router } from 'express';
export const setRoutes = Router();
import { setController } from './index.js';
setRoutes.get('/', setController.getAllEntity);
setRoutes.post('/save', setController.saveEntity);
