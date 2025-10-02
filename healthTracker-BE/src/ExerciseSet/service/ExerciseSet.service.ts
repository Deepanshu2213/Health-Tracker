import { BaseService } from '../../base/service/base.service.js';
import type { ExerciseSet } from '../models/ExerciseSet.js';
import { ExerciseSetRepository } from '../repository/ExerciseSet.repository.js';
export class ExerciseSetService extends BaseService<ExerciseSet> {
  constructor(public repository: ExerciseSetRepository) {
    super(repository);
  }
}
