import type { ModelStatic } from 'sequelize';
import { BaseController } from '../../base/controller/BaseController.js';
import type { SetService } from '../interface/set.service.interface.js';
import type { Set } from '../models/Set.js';

export class SetController extends BaseController<Set> {
  constructor(public service: SetService, model: ModelStatic<Set>) {
    super(service, model);
  }
}
