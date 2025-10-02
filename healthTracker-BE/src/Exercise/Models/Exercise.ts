import { DataTypes, Model, type Optional } from 'sequelize';
import { sequelize } from '../../config/db.js';

interface ExerciseAttributes {
  id: number;
  name: string;
  muscleGroup: string;
  equipment: string;
  difficulty: string;
}

interface ExerciseCreateAttributes extends Optional<ExerciseAttributes, 'id'> {}

export class Exercise
  extends Model<ExerciseAttributes, ExerciseCreateAttributes>
  implements ExerciseAttributes
{
  declare id: number;
  declare name: string;
  declare muscleGroup: string;
  declare equipment: string;
  declare difficulty: string;
}

Exercise.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    muscleGroup: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    equipment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Beginner',
    },
  },
  {
    sequelize,
    modelName: 'Exercises',
    freezeTableName: true,
  }
);
