export interface Set {
  setNo: number;
  repsCount: number;
  weight: number;
  finished: boolean;
  id: string;
}

export interface ExerciseSet {
  sets: Set[];
  name: string;
  exerciseId: number;
  id: string;
}
export interface Workout {
  exerciseSets: ExerciseSet[];
  userId: number;
  id: number;
  createdAt?: string;
}

export interface newWorkOut {
  exerciseSets: ExerciseSet[];
  userId: number;
}
