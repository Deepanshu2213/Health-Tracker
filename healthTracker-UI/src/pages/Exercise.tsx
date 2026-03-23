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
  const block = () => { };
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
    <div className="w-full flex justify-center items-center py-[2rem]">
      <div className="flex flex-col w-[65%] p-[2rem] gap-[2rem] home-resize backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl text-neutral-200">
        <div className={`${width < 700 ? 'flex flex-col gap-4' : 'flex items-center'}`}>
          <div className="flex justify-between items-center w-full">
            <h1 className="text-3xl p-1 my-1 flex-1 font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-300">Exercise Library</h1>
            <button
              hidden={useInPopup ? true : false}
              onClick={modalChange}
              className={`flex ${width < 700 ? 'flex-1 justify-center' : ''
                } text-lg gap-2 px-6 items-center py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] rounded-xl transition-all font-semibold`}
            >
              Add Exercise
            </button>
          </div>
          {selectedCount > 0 && (
            <button
              className={`text-xl p-2 my-2 ${width < 700 ? 'w-full' : 'w-auto px-4 ml-2 shrink-0 whitespace-nowrap'
                } rounded-xl bg-green-600/90 hover:bg-green-500/90 shadow-[0_0_15px_rgba(22,163,74,0.3)] hover:shadow-[0_0_25px_rgba(22,163,74,0.5)] text-white transition-all font-semibold`}
              onClick={addExercise}
            >
              {`Add Workout(${selectedCount})`}
            </button>
          )}
        </div>
        <div className="relative">
          <input
            type="text"
            name="searchbar"
            placeholder="Search exercises..."
            className="w-full bg-black/20 border border-white/10 rounded-2xl text-xl p-4 pl-12 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder-neutral-500 shadow-inner"
            onChange={onChange}
            value={searchTerm}
          />
          <svg className="w-6 h-6 text-neutral-500 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <div className="flex flex-col gap-[1.5rem] max-h-[65vh] overflow-y-auto pr-2 custom-scrollbar">
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
