import { DataTypes, Model, type Optional } from 'sequelize';
import { sequelize } from '../../config/db.js';
import { Set } from '../../Set/models/Set.js';
import { Exercise } from '../../Exercise/Models/Exercise.js';
import { Workout } from '../../Workout/models/Workout.js';

interface ExerciseSetAttributes {
  id: number;
  exerciseId: number;
  workoutId: number;
}

interface ExerciseSetCreateAttributes
  extends Optional<ExerciseSetAttributes, 'id'> {}

export class ExerciseSet
  extends Model<ExerciseSetAttributes, ExerciseSetCreateAttributes>
  implements ExerciseSetAttributes
{
  declare id: number;
  declare exerciseId: number;
  declare workoutId: number;
}

ExerciseSet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    exerciseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Exercises',
        key: 'id',
      },
    },
    workoutId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Workouts',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'ExerciseSets',
    freezeTableName: true,
  }
);

ExerciseSet.hasMany(Set, { foreignKey: 'exerciseSetId', as: 'sets' });
Set.belongsTo(ExerciseSet, { foreignKey: 'exerciseSetId', as: 'exerciseSet' });

ExerciseSet.belongsTo(Exercise, { foreignKey: 'exerciseId' });
Exercise.hasMany(ExerciseSet, { foreignKey: 'exerciseId' });

Workout.hasMany(ExerciseSet, { foreignKey: 'workoutId', as: 'exerciseSets' });
ExerciseSet.belongsTo(Workout, { foreignKey: 'workoutId', as: 'Workout' });
// ExerciseSet.belongsTo(Exercise, {
//   foreignKey: 'exerciseCode',  // column in ExerciseSet
//   targetKey: 'code',           // column in Exercise
//   as: 'exercise',
// });

// Exercise.hasMany(ExerciseSet, {
//   foreignKey: 'exerciseCode',  // column in ExerciseSet
//   sourceKey: 'code',           // column in Exercise
//   as: 'exerciseSets',
// });
