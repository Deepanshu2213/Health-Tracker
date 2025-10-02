import { BaseService } from '../../base/service/base.service.js';
import { createGenericToken } from '../../utils/loginUtil.js';
import type { userServiceInterface } from '../interface/userServiceInterface.js';
import { User } from '../models/User.js';
import type { UserRepository } from '../repository/user.repository.js';

export class UserService
  extends BaseService<User>
  implements userServiceInterface
{
  constructor(public repository: UserRepository) {
    super(repository);
  }
  login = async (emailId: string, password: string): Promise<string> => {
    const user = await User.login(emailId, password);
    if (user) {
      const token = createGenericToken(user);
      return token;
    }
    throw Error('User Not Found');
  };
}
