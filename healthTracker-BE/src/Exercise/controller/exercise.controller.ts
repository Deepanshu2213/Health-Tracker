import type { ModelStatic } from 'sequelize';
import { BaseController } from '../../base/controller/BaseController.js';
import type { Exercise } from '../Models/Exercise.js';
import type { ExerciseServiceInterface } from '../interface/exercise.serviceInterface.js';

export class ExerciseController extends BaseController<Exercise> {
  constructor(
    public service: ExerciseServiceInterface,
    public model: ModelStatic<Exercise>
  ) {
    super(service, model);
  }
}
