import { type Request } from 'express';
import { type IUser } from '../old/models/User.js';
export interface UserRequest extends Request {
  user: IUser;
}
