// import { DataTypes, Model, type Optional } from 'sequelize';
// import { sequelize } from '../../config/db.js';

// interface WrokoutStatsViewAttributes {
//   userId: number;
//   total_workouts: number;
//   this_month: number;
//   current_streak: number;
// }

// interface WrokoutStatsCreateViewAttributes
//   extends Optional<WrokoutStatsViewAttributes, 'userId'> {}

// export class WrokoutStatsView extends Model<
//   WrokoutStatsViewAttributes,
//   WrokoutStatsCreateViewAttributes
// > {
//   declare userId: number;
//   declare total_workouts: number;
//   declare this_month: number;
//   declare current_streak: number;
// }
// WrokoutStatsView.init(
//   {
//     userId: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//     },
//     total_workouts: {
//       type: DataTypes.INTEGER,
//     },
//     this_month: {
//       type: DataTypes.INTEGER,
//     },
//     current_streak: {
//       type: DataTypes.INTEGER,
//     },
//   },
//   {
//     sequelize,
//     tableName: 'workout_stats',
//     timestamps: false,
//     freezeTableName: true,
//     schema: 'public',
//   }
// );
// //
// // Prevent writes
// WrokoutStatsView.beforeCreate(() => {
//   throw new Error('This is a view — cannot create rows');
// });
// WrokoutStatsView.beforeUpdate(() => {
//   throw new Error('This is a view — cannot update rows');
// });
// WrokoutStatsView.beforeDestroy(() => {
//   throw new Error('This is a view — cannot delete rows');
// });
