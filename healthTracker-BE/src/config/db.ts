import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

console.log('DB creds:', {
  name1: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
  }
);
