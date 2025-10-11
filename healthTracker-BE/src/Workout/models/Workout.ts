import { DataTypes, Model, type Optional } from 'sequelize';
import { sequelize } from '../../config/db.js';
import { User } from '../../User/models/User.js';
export interface WorkoutAttributes {
  id: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface WorkoutCreationAttributes extends Optional<WorkoutAttributes, 'id'> {}

export class Workout
  extends Model<WorkoutAttributes, WorkoutCreationAttributes>
  implements WorkoutAttributes
{
  declare id: number;
  declare userId: number;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Workout.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: 'Users', key: 'id' },
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Workouts',
    timestamps: true,
    freezeTableName: true,
  }
);

User.hasMany(Workout, { foreignKey: 'userId' });
Workout.belongsTo(User, { foreignKey: 'userId' });
