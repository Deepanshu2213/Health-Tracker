import { configureStore } from '@reduxjs/toolkit';
import { loginSliceReducer } from './slices/loginSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { addWorkoutReducer } from './slices/addWorkoutSlice';
import { WorkoutApi } from './apis/WorkoutApi';
import { ExerciseApi } from './apis/Exercise';
import { CurrentWorkoutReducer } from './slices/CurretWorkout';

// const middleware: Middleware = (store) => (next) => (action) => {
//   console.log('%c Previous State:', 'color: gray', store.getState());
//   console.log('%c Action:', 'color: blue', action);

//   const result = next(action);

//   console.log('%c Next State:', 'color: green', store.getState());
//   return result;
// };

export const store = configureStore({
  reducer: {
    login: loginSliceReducer,
    addWorkout: addWorkoutReducer,
    currentWorkout: CurrentWorkoutReducer,
    [ExerciseApi.reducerPath]: ExerciseApi.reducer,
    [WorkoutApi.reducerPath]: WorkoutApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      //.concat(middleware)
      .concat(WorkoutApi.middleware)
      .concat(ExerciseApi.middleware),
});
(window as any).store = store;
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type loginDispatch = typeof store.dispatch;
export * from './thunks/loginThunks';
export * from './thunks/CreateUser';
export * from './thunks/checkToken';
export * from './slices/addWorkoutSlice';
export * from './apis/WorkoutApi';
