import { BaseService } from '../../base/service/base.service.js';
import type { ExerciseInterface } from '../interface/exercise.interface.js';
import type { ExerciseServiceInterface } from '../interface/exercise.serviceInterface.js';
import type { Exercise } from '../Models/Exercise.js';

export class ExerciseService
  extends BaseService<Exercise>
  implements ExerciseServiceInterface
{
  constructor(public service: ExerciseInterface) {
    super(service);
  }
}
