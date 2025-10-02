import { type FC } from 'react';
import wrappedComponent from '../utils/wrappedComponent';
import { Save, Plus } from 'lucide-react';
import { AddExercise } from '../components/AddExercise';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  removeWorkout,
  store,
  useSaveWorkoutMutation,
  type RootState,
} from '../store';
import { addNewSetExercise } from '../store';
import type { newWorkOut } from '../interface/Workout_Interfaces';
import { BasePopup } from '../components/BasePopup';
import { Exercise } from './Exercise';
import { useModlaHooks } from '../hooks/useModalHook';

const AddWorkoutMain = () => {
  // useEffect(() => {
  //   dispatch(addNewWorkout({ name: 'shoulde press', id: '1', data: [] }));
  // }, []);

  const exerciseSets = useSelector((state: RootState) => {
    return state.addWorkout.data?.exerciseSets.map(
      (exerciseSet) => exerciseSet.id
    );
  }, shallowEqual);
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-[65%] p-[1rem] gap-[1rem]">
        <Header />
        <input
          type="email"
          id="userEmail"
          name="email"
          required
          placeholder="Enter Workout name ..."
          className="border-1 border-slate-300 text-xl p-[1rem]"
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
          className="bg-slate-600 flex p-3 rounded-lg gap-2 shadow-lg"
          onClick={addWorkout}
        >
          <Save />
          Add Exercise
        </button>
        <button
          className="bg-slate-600 flex p-3 rounded-lg gap-2 shadow-lg"
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
