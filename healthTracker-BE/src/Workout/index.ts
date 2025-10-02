import { WorkoutController } from './controller/workout.controller.js';
import { Workout } from './models/Workout.js';
import { WorkoutRepository } from './repository/workout.repository.js';
import { WorkoutService } from './service/workout.service.js';

export const workoutRepo = new WorkoutRepository();
export const workoutService = new WorkoutService(workoutRepo);
export const workoutController = new WorkoutController(workoutService, Workout);
