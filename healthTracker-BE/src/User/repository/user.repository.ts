import { BaseRepository } from '../../base/repository/base.repository.js';
import { User } from '../models/User.js';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }
}
