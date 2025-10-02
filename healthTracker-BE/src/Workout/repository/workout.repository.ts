import { BaseRepository } from '../../base/repository/base.repository.js';
import { Workout } from '../models/Workout.js';

export class WorkoutRepository extends BaseRepository<Workout> {
  constructor() {
    super(Workout);
  }
}
