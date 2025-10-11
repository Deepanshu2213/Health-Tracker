import { createSlice } from '@reduxjs/toolkit';
import { type PayloadAction } from '@reduxjs/toolkit';
import type {
  ExerciseSet,
  Set,
  Workout,
} from '../../interface/Workout_Interfaces';

interface initailStateStore {
  data: Workout;
  loading: boolean;
  error: Object | undefined;
}

const initialState: initailStateStore = {
  data: {
    exerciseSets: [],
    userId: 1,
    id: 1,
  },
  loading: false,
  error: undefined,
};
export const addWorkoutSlice = createSlice({
  name: 'addWorkout',
  initialState: initialState,
  reducers: {
    addSetToExercice: (
      state,
      action: PayloadAction<{ newModel: Set; exerciseSetId: string }>
    ) => {
      const { exerciseSetId, newModel } = action.payload;
      const workouts = state.data?.exerciseSets.filter(
        (record) => record.id == exerciseSetId
      );
      workouts?.forEach((workout) => {
        workout.sets.push(newModel);
      });
    },
    addNewSetExercise: (state, action: PayloadAction<ExerciseSet>) => {
      state.data?.exerciseSets.push(action.payload);
    },
    saveWorkout: (state) => {},
    updateSets: (
      state,
      action: PayloadAction<{
        val: string | number;
        name: string;
        exerciseSetId: string;
        setId: string;
      }>
    ) => {
      const { name, val, setId, exerciseSetId } = action.payload;
      let set: any = state.data?.exerciseSets
        .find((exerciseSet) => exerciseSet.id == exerciseSetId)
        ?.sets.find((set) => set.id == setId);
      set[name] = val;
    },
    deleteSetExercise: (
      state,
      action: PayloadAction<{ exerciseSetId: string }>
    ) => {
      const { exerciseSetId } = action.payload;
      if (state.data && state.data.exerciseSets) {
        state.data.exerciseSets = state.data.exerciseSets.filter(
          (exerciseSet) => exerciseSet.id != exerciseSetId
        );
      }
    },
    removeWorkout: (state) => {
      state.data.exerciseSets = [];
    },
  },
});

export const {
  addSetToExercice,
  addNewSetExercise,
  updateSets,
  deleteSetExercise,
  removeWorkout,
} = addWorkoutSlice.actions;
export const addWorkoutReducer = addWorkoutSlice.reducer;
