import { configureStore } from '@reduxjs/toolkit';
import { loginSliceReducer } from './slices/loginSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { addWorkoutReducer } from './slices/addWorkoutSlice';
import { WorkoutApi } from './apis/WorkoutApi';
import { ExerciseApi } from './apis/Exercise';

export const store = configureStore({
  reducer: {
    login: loginSliceReducer,
    addWorkout: addWorkoutReducer,
    [ExerciseApi.reducerPath]: ExerciseApi.reducer,
    [WorkoutApi.reducerPath]: WorkoutApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
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
