import { DataTypes, Model, type Optional } from 'sequelize';
import { sequelize } from '../../config/db.js';
import bcrypt from 'bcrypt';

export interface UserAttributes {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  static async login(email: string, password: string): Promise<User> {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      if (password == 'oauth') {
        throw new Error('Weak password please create new one');
      }
      const ans = await bcrypt.compare(password, user.get('password'));
      if (ans && user.get('email') === email) {
        return user;
      }
      throw new Error('Invalid password');
    }
    throw new Error('Incorrect Email');
  }
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Users',
    freezeTableName: true,
  }
);

User.addHook('beforeSave', async (user: User) => {
  if (user.changed('password') && user.get('password')) {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(user.get('password'), salt);
    user.set('password', newPassword);
  }
});

export { User };
