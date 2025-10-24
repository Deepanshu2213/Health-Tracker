import { useEffect, type ChangeEvent, type FC } from 'react';
import wrappedComponent from '../utils/wrappedComponent';
import { Save, Plus } from 'lucide-react';
import { AddExercise } from '../components/AddExercise';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  addNewSetsExercise,
  removeWorkout,
  store,
  updateName,
  useSaveWorkoutMutation,
  type loginDispatch,
  type RootState,
} from '../store';
import { addNewSetExercise } from '../store';
import type { newWorkOut, Workout } from '../interface/Workout_Interfaces';
import { BasePopup } from '../components/BasePopup';
import { Exercise } from './Exercise';
import { useModlaHooks } from '../hooks/useModalHook';
import { useLocation } from 'react-router-dom';

const AddWorkoutMain = () => {
  const dispatch = useDispatch<loginDispatch>();
  const location = useLocation();
  const workout = location?.state?.workout as Workout | undefined;
  let workoutCopy = JSON.parse(JSON.stringify(workout || '')) as Workout;
  useEffect(() => {
    if (workoutCopy) {
      workoutCopy?.exerciseSets.forEach((exerciseSet) => {
        exerciseSet.name = exerciseSet?.Exercise?.name || '';
      });
      dispatch(addNewSetsExercise(workoutCopy.exerciseSets));
    }
  }, []);
  const nameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    dispatch(updateName(name));
  };
  const exerciseSets = useSelector((state: RootState) => {
    return state.addWorkout.data?.exerciseSets.map(
      (exerciseSet) => exerciseSet.id
    );
  }, shallowEqual);
  const name = useSelector((state: RootState) => {
    return state.addWorkout.data.name;
  }, shallowEqual);
  return (
    <div className="flex flex-col items-center py-[1rem]">
      <div className="flex flex-col w-[65%] p-[1rem] gap-[1rem] home-resize">
        <Header />
        <input
          type="email"
          id="userEmail"
          name="email"
          value={name}
          onChange={nameChange}
          required
          placeholder="Enter Workout name ..."
          className="border-3 border-neutral-700 text-xl p-[1rem]"
        />
        {exerciseSets?.map((id) => {
          return <AddExercise itemId={id} />;
        })}
      </div>
    </div>
  );
};

const Header: FC = () => {
  const [isOpen, setOpen] = useModlaHooks();

  const [saveWorkoutCall, { isLoading }] = useSaveWorkoutMutation();
  const dispatch = useDispatch();
  const addWorkout = () => {
    setOpen((pre) => !pre);
  };
  const addNewModel = (exerciseId: number, name: string) => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2);
    dispatch(
      addNewSetExercise({
        name: name,
        id: id,
        sets: [],
        exerciseId: exerciseId,
      })
    );
  };
  const saveWorkout = async () => {
    const newWorkout: newWorkOut = sanatizeWorkoutModel();
    await saveWorkoutCall(newWorkout);
    dispatch(removeWorkout());
  };
  const sanatizeWorkoutModel = () => {
    const workout = store.getState().addWorkout.data;
    const newData = JSON.parse(JSON.stringify(workout));
    removeIdsFromModel(newData);
    return newData;
  };
  (window as any).sanatizeWorkoutModel = sanatizeWorkoutModel;
  const removeIdsFromModel = (data: any) => {
    Object.keys(data).forEach((key) => {
      if (key == 'id') {
        delete data['id'];
      }
      if (typeof data[key] == 'object') {
        removeIdsFromModel(data[key]);
      }
    });
  };
  return (
    <div className="flex ">
      <div className="flex-1 content-center text-2xl p-2">Start Workout</div>
      <div className="flex-1 justify-end flex gap-[1rem]">
        <button
          className="flex text-lg gap-2 rounded-xl px-3 border-2 border-white/20 items-center"
          onClick={addWorkout}
        >
          <Save />
          Add Exercise
        </button>
        <button
          className="flex text-lg gap-2 rounded-xl px-3 border-2 border-white/20 items-center"
          onClick={isLoading ? () => {} : saveWorkout}
        >
          <Plus />
          {isLoading ? 'Loading' : 'Finish'}
        </button>
      </div>
      {isOpen && (
        <BasePopup setOpen={setOpen}>
          <Exercise
            useInPopup={true}
            setOpen={setOpen}
            addNewModel={addNewModel}
          />
        </BasePopup>
      )}
    </div>
  );
};

export const AddWorkout = wrappedComponent(AddWorkoutMain, {
  light: false,
  screen: true,
});
