import mongoose, { Model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  firstName?: string;
  lastName?: string;
  id: string;
  email: string;
  password: string;
}

export interface IUserModel extends Model<IUser> {
  login(email: string, password: string): Promise<IUser>;
}
const userSchema = new Schema<IUser, IUserModel>({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.statics.login = async function (
  email: string,
  password: string
): Promise<IUser> {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if ((auth || password === user.password) && email === user.email) {
      return user;
    }
    throw new Error('Invalid password');
  }
  throw new Error('Incorrect Email');
};
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

export const User = mongoose.model<IUser, IUserModel>('User', userSchema);
