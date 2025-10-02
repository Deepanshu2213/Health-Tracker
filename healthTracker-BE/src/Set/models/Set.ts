import { DataTypes, Model, type Optional } from 'sequelize';
import { sequelize } from '../../config/db.js';
import { ExerciseSet } from '../../ExerciseSet/models/ExerciseSet.js';

interface SetAttribute {
  setNo: number;
  repsCount: number;
  weight: number;
  finished: boolean;
  id: number;
  exerciseSetId: number;
}

interface SetCreationAttribute extends Optional<SetAttribute, 'id'> {}

export class Set extends Model<SetAttribute, SetCreationAttribute> {
  declare setNo: number;
  declare repsCount: number;
  declare weight: number;
  declare finished: boolean;
  declare id: number;
  declare exerciseSetId: number;
}

Set.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    repsCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    finished: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    setNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    exerciseSetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'ExerciseSets', key: 'id' },
    },
  },
  { sequelize, modelName: 'Sets', freezeTableName: true }
);
