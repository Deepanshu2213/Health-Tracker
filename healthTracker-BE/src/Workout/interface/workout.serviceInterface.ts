import type { BaseServiceInterface } from '../../base/interface/BaseServiceInterface.js';
import type { Workout } from '../models/Workout.js';

export interface WorkoutServiceInterface
  extends BaseServiceInterface<Workout> {}
