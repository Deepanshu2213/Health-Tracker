import { useEffect, type ChangeEvent, type FC } from 'react';
import wrappedComponent from '../utils/wrappedComponent';
import { Save, Plus, Dumbbell } from 'lucide-react';
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
import { useResizeContext } from '../hooks/useResizeContext';

const AddWorkoutMain = () => {
  const dispatch = useDispatch<loginDispatch>();
  const [isOpen, setOpen] = useModlaHooks();
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
    <div className="flex flex-col items-center py-[2rem]">
      <div className="flex flex-col w-[65%] p-[2rem] gap-[2rem] home-resize-full backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl text-neutral-200">
        <Header isOpen={isOpen} setOpen={setOpen} />
        <input
          type="text"
          id="workoutName"
          name="name"
          value={name}
          onChange={nameChange}
          required
          placeholder="Enter Workout name ..."
          className="bg-transparent border-b border-white/20 focus:border-violet-500 text-3xl px-2 py-4 outline-none placeholder-neutral-500 transition-colors w-full"
        />
        {exerciseSets && exerciseSets.length > 0 ? (
          exerciseSets.map((id) => <AddExercise key={id} itemId={id} />)
        ) : (
          <div 
            onClick={() => setOpen(true)}
            className="flex flex-col items-center justify-center py-16 px-6 mt-4 backdrop-blur-md bg-white/5 border-2 border-dashed border-white/20 rounded-3xl text-neutral-400 gap-4 transition-all duration-300 hover:bg-white/10 hover:border-white/40 cursor-pointer"
          >
            <div className="p-5 bg-white/5 rounded-full mb-2 shadow-inner">
              <Dumbbell size={48} className="text-white/40" />
            </div>
            <h2 className="text-2xl font-light text-white tracking-wide">Your workout is empty</h2>
            <p className="text-center max-w-sm leading-relaxed">Click the <strong className="text-white font-medium">Add Exercise</strong> button above to start building your custom routine.</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface HeaderProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header: FC<HeaderProps> = ({ isOpen, setOpen }) => {
  const { width } = useResizeContext();
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
    if (!newWorkout.name || newWorkout.name.trim() === '') {
      alert('Please enter a valid workout name');
      return;
    }
    if (!newWorkout.exerciseSets || newWorkout.exerciseSets.length == 0) {
      alert('Please Add Workout');
      return;
    }
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
    <div className={`flex ${width < 700 ? 'flex-col gap-4' : 'items-center'} mb-4`}>
      <div className="flex-1 content-center text-3xl p-1 font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-300">Start Workout</div>
      <div
        className={`flex-1 ${width < 700 ? '' : 'justify-end'} flex gap-[1rem]`}
      >
        <button
          className={`flex ${
            width < 700 ? 'flex-1 justify-center' : ''
          } text-lg gap-2 px-5 items-center py-3 bg-white/5 hover:bg-white/10 border border-white/10 shadow-lg rounded-xl transition-all`}
          onClick={addWorkout}
        >
          <Save size={20} />
          Add Exercise
        </button>
        <button
          className={`flex text-lg gap-2 px-6 items-center py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] rounded-xl transition-all font-semibold ${
            width < 700 ? 'flex-1 justify-center' : ''
          }`}
          onClick={isLoading ? () => {} : saveWorkout}
        >
          <Plus size={20} />
          {isLoading ? 'Loading...' : 'Finish'}
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
