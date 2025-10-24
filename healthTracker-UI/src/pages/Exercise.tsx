import { useState, type FC } from 'react';
import wrappedComponent from '../utils/wrappedComponent';
import {
  ExerciseDetails,
  type exerciseData,
} from '../components/ExerciseDetails';
import { useGetExercisesQuery } from '../store/apis/Exercise';
import { getKeys } from '../utils/utiltiy';
import { shallowEqual, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { Loader } from '../components/Loader';

export interface exerciseMap {
  [id: string]: exerciseData;
}

interface ExerciseMainProps {
  useInPopup?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  addNewModel?: (exerciseId: number, name: string) => void;
}

const ExerciseMain: FC<ExerciseMainProps> = ({
  useInPopup,
  addNewModel,
  setOpen,
}) => {
  const { isLoading, data: res } = useGetExercisesQuery();
  const alreadySelected =
    setOpen &&
    useSelector(
      (state: RootState) =>
        state.addWorkout.data.exerciseSets.map(
          (exerciseSet) => exerciseSet.exerciseId
        ),
      shallowEqual
    );
  let data: exerciseData[] | undefined = res?.data;
  const [selectedExercise, setSelectedExercise] = useState<exerciseMap>({});
  if (res && res.data && alreadySelected) {
    data = res?.data.filter(
      (exerciseData) => !alreadySelected.includes(exerciseData.id)
    );
  }
  const block = () => {};
  if (isLoading) {
    return <Loader />;
  }
  const addExercise = () => {
    const exercises = getKeys(selectedExercise);
    exercises.forEach((exercisId) => {
      addNewModel?.(
        parseInt(exercisId as string),
        selectedExercise[exercisId].name
      );
    });
    setOpen?.(false);
  };
  const selectedCount = Object.keys(selectedExercise).length;
  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex flex-col w-[65%] p-[1rem] gap-[1rem]">
        <div className="flex">
          <p className="text-2xl p-1 my-1 flex-1">Exercise Library</p>
          {selectedCount > 0 && (
            <button
              className="text-xl p-1 my-2 w-[23vh] rounded-lg border border-1"
              onClick={addExercise}
            >
              {`Add Workout(${selectedCount})`}
            </button>
          )}
        </div>
        <input
          type="text"
          name="searchbar"
          placeholder="Search term"
          className="border-2 border-neutral-700 text-xl p-3"
        ></input>
        <div className="flex flex-col gap-[2rem] max-h-[75vh] overflow-y-auto">
          {data?.map((exercise) => (
            <ExerciseDetails
              id={exercise.id}
              data={exercise}
              isSelected={
                useInPopup &&
                selectedExercise.hasOwnProperty(exercise.id.toString())
              }
              setSelected={useInPopup ? setSelectedExercise : block}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const Exercise = wrappedComponent(ExerciseMain, {
  light: false,
  className: 'h-screen',
  //screen: true,
});
