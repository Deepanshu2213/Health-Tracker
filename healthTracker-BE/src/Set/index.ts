import { BaseRepository } from '../base/repository/base.repository.js';
import { SetController } from './controller/set.controller.js';
import { Set } from './models/Set.js';
import { SetService } from './service/set.service.js';

export const setRepo = new BaseRepository<Set>(Set);
export const setService = new SetService(setRepo);
export const setController = new SetController(setService, Set);
