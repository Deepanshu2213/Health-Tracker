import type { ModelStatic } from 'sequelize';
import { BaseController } from '../../base/controller/BaseController.js';
import type { BaseServiceInterface } from '../../base/interface/BaseServiceInterface.js';
import type { Workout } from '../models/Workout.js';

export class WorkoutController extends BaseController<Workout> {
  constructor(
    public service: BaseServiceInterface<Workout>,
    public model: ModelStatic<Workout>
  ) {
    super(service, model);
  }
}
