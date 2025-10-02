import type { BaseRepositoryInterface } from '../../base/interface/baseRepository.js';
import { BaseService } from '../../base/service/base.service.js';
import type { WorkoutServiceInterface } from '../interface/workout.serviceInterface.js';
import type { Workout } from '../models/Workout.js';

export class WorkoutService
  extends BaseService<Workout>
  implements WorkoutServiceInterface
{
  constructor(public service: BaseRepositoryInterface<Workout>) {
    super(service);
  }
}
