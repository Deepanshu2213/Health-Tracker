import { ExerciseSet } from './models/ExerciseSet.js';
import { ExerciseSetRepository } from './repository/ExerciseSet.repository.js';
import { ExerciseSetService } from './service/ExerciseSet.service.js';
import { ExerciseSetController } from './controller/ExerciseSet.controller.js';
export const exerciseSetRepo = new ExerciseSetRepository();
export const exerciseSetService = new ExerciseSetService(exerciseSetRepo);
export const exerciseSetController = new ExerciseSetController(
  exerciseSetService,
  ExerciseSet
);
