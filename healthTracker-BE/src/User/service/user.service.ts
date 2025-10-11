import { google } from 'googleapis';
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
  oauth = async (code: string): Promise<User> => {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    const { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();
    let { email, verified_email, name } = userInfo.data;
    if (!email || !verified_email) {
      throw Error('Email Not verified');
    }
    name = name ? name : '';
    const [user] = await User.findOrCreate({
      where: { email: email },
      defaults: {
        email,
        firstName: name as string,
        password: 'oauth',
      },
    });
    return user;
  };
}
