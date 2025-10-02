import { BaseRepository } from '../../base/repository/base.repository.js';
import { ExerciseSet } from '../models/ExerciseSet.js';

export class ExerciseSetRepository extends BaseRepository<ExerciseSet> {
  constructor() {
    super(ExerciseSet);
  }
}
