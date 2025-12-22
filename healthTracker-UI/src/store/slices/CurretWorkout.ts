import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
const CurrentWorkoutSlice = createSlice({
  name: 'CurrentWorkout',
  initialState: '' as string,
  reducers: {
    updateWorkout: (_, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { updateWorkout } = CurrentWorkoutSlice.actions;
export const CurrentWorkoutReducer = CurrentWorkoutSlice.reducer;
