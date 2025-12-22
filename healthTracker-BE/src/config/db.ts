import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

console.log('DB creds:', {
  name1: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
export let sequelize: Sequelize;
const isProduction = process.env.NODE_ENV === 'production';
const isLocal = process.env.NODE_ENV === 'local';

if (isLocal) {
  sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
      host: 'localhost',
      dialect: 'postgres',
      logging: false,
    }
  );
} else {
  sequelize = new Sequelize(process.env.DATABASE_URL as string, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: isProduction
      ? { ssl: false } // Render Internal DB
      : {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
  });
}
