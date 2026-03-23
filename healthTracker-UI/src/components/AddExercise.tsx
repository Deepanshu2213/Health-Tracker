import { useEffect, type FC, type KeyboardEvent, type ReactNode } from 'react';
import { Trash2 } from 'lucide-react';
import classNames from 'classnames';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { deleteSetExercise, type loginDispatch } from '../store';
import { type RootState, addSetToExercice, updateSets } from '../store';
import { Timer } from './Timer';
import type { Set } from '../interface/Workout_Interfaces';
import { useResizeContext } from '../hooks/useResizeContext';
interface AddExerciseProps {
  className?: string;
  children?: ReactNode;
  itemId: string;
}

export const AddExercise: FC<AddExerciseProps> = ({ className, itemId }) => {
  const dispatch = useDispatch<loginDispatch>();
  const { width } = useResizeContext();
  const workoutName = useSelector((state: RootState) => {
    return state.addWorkout.data?.exerciseSets.find(
      (record) => record.id == itemId
    )?.name;
  }, shallowEqual);
  const setIds = useSelector((state: RootState) => {
    return state.addWorkout.data?.exerciseSets
      .find((record) => record.id == itemId)
      ?.sets.map((set) => set.id);
  }, shallowEqual);

  const deleteThisWorkOut = () => {
    dispatch(deleteSetExercise({ exerciseSetId: itemId }));
  };
  const GenerateFirstSet = (exerciseSetId: string) => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2);
    const newModel: Set = {
      id,
      setNo: 1,
      repsCount: 1,
      weight: 1,
      timeTaken: 0,
      finished: false,
    };
    dispatch(addSetToExercice({ exerciseSetId, newModel }));
  };
  useEffect(() => {
    if (setIds?.length == 0) {
      GenerateFirstSet(itemId);
    }
  }, []);
  const addNewSet = () => {
    GenerateFirstSet(itemId);
  };
  const cls = classNames(
    'flex flex-col shrink-0 text-2xl w-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl rounded-2xl p-2 transition-all hover:bg-white/10',
    className
  );
  return (
    <div className={cls}>
      <div className="flex w-full ">
        <div className="flex-1 p-3">{workoutName}</div>
        <div className="flex flex-1 justify-end p-2 gap-4 items-center text-lg px-4">
          <button
            className="px-4 shadow-[0_0_10px_rgba(139,92,246,0.2)] hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] py-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 border border-transparent text-white font-semibold flex items-center transition-all hover:scale-105"
            onClick={addNewSet}
          >
            Add Set
          </button>
          <Trash2
            onClick={deleteThisWorkOut}
            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 p-2 rounded-xl border border-red-500/20 shadow-lg cursor-pointer transition-all hover:scale-110"
            height={40}
            width={40}
          />
        </div>
      </div>
      <div className="flex px-5 py-3 text-lg gap-[2.2vw]">
        <p className="flex-[0.2]">Set</p>
        <p className="flex-1">Reps</p>
        <p className="flex-1 ml-3">Weight (lbs)</p>
        {width > 700 ? <p className={`flex-1 ml-5`}>✓</p> : ''}
        <p className="flex-1 ml-4">Timer</p>
      </div>
      {setIds?.map((setId, idx) => (
        <GetSet
          setId={setId}
          idx={idx + 1}
          key={setId}
          exerciseSetId={itemId}
        />
      ))}
    </div>
  );
};

interface getSetProps {
  setId: string;
  idx: number;
  exerciseSetId: string;
}
const GetSet: FC<getSetProps> = ({ setId, idx, exerciseSetId }) => {
  const { width } = useResizeContext();
  const repsCount = useSelector((state: RootState) => {
    return state.addWorkout.data?.exerciseSets
      .find((rec) => rec.id == exerciseSetId)
      ?.sets.find((set) => set.id == setId)?.repsCount;
  }, shallowEqual);
  const weight = useSelector((state: RootState) => {
    return state.addWorkout.data?.exerciseSets
      .find((rec) => rec.id == exerciseSetId)
      ?.sets.find((set) => set.id == setId)?.weight;
  }, shallowEqual);
  const finished = useSelector((state: RootState) => {
    return state.addWorkout.data?.exerciseSets
      .find((rec) => rec.id == exerciseSetId)
      ?.sets.find((set) => set.id == setId)?.finished;
  }, shallowEqual);

  const dispatch = useDispatch<loginDispatch>();
  const inputCls = 'flex-1 min-w-0 p-3 bg-black/20 border border-white/10 text-white rounded-xl focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all shadow-inner';
  const setValueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val: any = e.currentTarget.value;
    const name = e.currentTarget.name;
    if (name == 'finished') {
      val = parseInt(val) > 0 ? true : false;
    }
    dispatch(updateSets({ val, name, exerciseSetId, setId }));
  };
  const keyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    debugger;
    if (e.key == '-' || e.key == 'e' || e.key == '0') {
      e.preventDefault();
    }
  };
  return (
    <div className="flex p-5 text-lg gap-[1vw]">
      <div className="flex-[0.2] content-center">{idx}</div>
      <input
        className={inputCls}
        value={repsCount}
        min={1}
        onKeyDown={keyPress}
        name="repsCount"
        onChange={setValueChangeHandler}
        type="number"
      />
      <input
        className={inputCls}
        value={weight}
        name="weight"
        min={1}
        onKeyDown={keyPress}
        onChange={setValueChangeHandler}
        type="number"
      />
      {width > 700 ? (
        <input
          className={inputCls}
          value={finished ? 1 : 0}
          min={1}
          onKeyDown={keyPress}
          name="finished"
          onChange={setValueChangeHandler}
          type="text"
        />
      ) : (
        ''
      )}
      <SetTimer setId={setId} exerciseSetId={exerciseSetId} />
    </div>
  );
};

interface SetTimerInterface {
  setId: string;
  exerciseSetId: string;
}
const SetTimer: FC<SetTimerInterface> = ({ setId, exerciseSetId }) => {
  const { width } = useResizeContext();
  const timeTaken = useSelector(
    (state: RootState) =>
      state.addWorkout.data.exerciseSets
        .find((exerciseSet) => exerciseSet.id === exerciseSetId)
        ?.sets.find((set) => set.id == setId)?.timeTaken,
    shallowEqual
  );
  const dispatch = useDispatch<loginDispatch>();
  const onChange = (val: number) => {
    dispatch(updateSets({ val, name: 'timeTaken', exerciseSetId, setId }));
  };
  return (
    <Timer
      className={`${width > 700 ? 'flex-1' : 'flex-[2.5]'}`}
      onChange={onChange}
      value={timeTaken}
    />
  );
};
