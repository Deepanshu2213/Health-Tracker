import { ExerciseController } from './controller/exercise.controller.js';
import { Exercise } from './Models/Exercise.js';
import { ExerciseRepository } from './repository/exercise.repository.js';
import { ExerciseService } from './services/exercise.service.js';

export const exerciseRepo = new ExerciseRepository();
export const exerciseService = new ExerciseService(exerciseRepo);
export const exerciseController = new ExerciseController(
  exerciseService,
  Exercise
);
