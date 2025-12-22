import { useEffect, useRef, useState, type ChangeEvent, type FC } from 'react';
import wrappedComponent from '../utils/wrappedComponent';
import {
  ExerciseDetails,
  type exerciseData,
} from '../components/ExerciseDetails';
import { useGetExercisesQuery } from '../store/apis/Exercise';
import { debounce, getKeys } from '../utils/utiltiy';
import { shallowEqual, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { Loader } from '../components/Loader';
import { useResizeContext } from '../hooks/useResizeContext';
import { BasePopup } from '../components/BasePopup';
import { useModlaHooks } from '../hooks/useModalHook';
import { AddExercise } from './AddExercise';

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
  const [open, setOpenModal] = useModlaHooks();
  const { isLoading, data: res } = useGetExercisesQuery();
  const { width } = useResizeContext();
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const [finalTerm, setFinalTerm] = useState<string | undefined>();
  const changeSearch = useRef(
    debounce((term: string) => {
      setFinalTerm(term);
    }, 500)
  ).current;
  useEffect(() => {
    changeSearch(searchTerm);
  }, [searchTerm]);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
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
  data = finalTerm
    ? data?.filter((ele) =>
        ele.name.toLowerCase().includes(finalTerm.toLowerCase())
      )
    : data;
  const modalChange = () => {
    setOpenModal((prev) => !prev);
  };
  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex flex-col w-[65%] p-[1rem] gap-[1rem] home-resize">
        <div className={`${width < 700 ? 'flex flex-col' : 'flex'}`}>
          <div className="flex justify-between items-center w-full">
            <p className="text-2xl p-1 my-1 flex-1">Exercise Library</p>
            <button
              hidden={useInPopup ? true : false}
              onClick={modalChange}
              className={`flex ${
                width < 700 ? 'flex-1' : ''
              } text-lg gap-2 rounded-xl px-3 items-center py-2 bg-gray-800 border-2 border-gray-700 hover:border-gray-600 rounded-lg`}
            >
              Add Exercise
            </button>
          </div>
          {selectedCount > 0 && (
            <button
              className={`text-xl p-1 my-2 ${
                width < 700 ? 'w-full' : 'w-[23vh]'
              } rounded-lg border border-1`}
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
          onChange={onChange}
          value={searchTerm}
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
      {open && (
        <BasePopup setOpen={setOpenModal}>
          <AddExercise setOpen={setOpenModal} />
        </BasePopup>
      )}
    </div>
  );
};

export const Exercise = wrappedComponent(ExerciseMain, {
  light: false,
  className: 'h-screen',
  //screen: true,
});
