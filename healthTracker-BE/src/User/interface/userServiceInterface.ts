import { User } from '../models/User.js';
import { type BaseServiceInterface } from '../../base/interface/BaseServiceInterface.js';
export interface userServiceInterface extends BaseServiceInterface<User> {
  login(emailId: string, password: string): Promise<string>;
}
