import { BaseRepository } from '../../base/repository/base.repository.js';
import { Exercise } from '../Models/Exercise.js';

export class ExerciseRepository
  extends BaseRepository<Exercise>
  implements ExerciseRepository
{
  constructor() {
    super(Exercise);
  }
}
