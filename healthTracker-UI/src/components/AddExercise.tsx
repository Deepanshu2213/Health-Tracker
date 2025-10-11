import { useEffect, type FC, type ReactNode } from 'react';
import { Trash2 } from 'lucide-react';
import classNames from 'classnames';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { deleteSetExercise, type loginDispatch } from '../store';
import { type RootState, addSetToExercice, updateSets } from '../store';
import { Timer } from './Timer';
import type { Set } from '../interface/Workout_Interfaces';
interface AddExerciseProps {
  className?: string;
  children?: ReactNode;
  itemId: string;
}

export const AddExercise: FC<AddExerciseProps> = ({
  className,
  children,
  itemId,
}) => {
  const dispatch = useDispatch<loginDispatch>();
  const workoutName = useSelector((state: RootState) => {
    return state.addWorkout.data?.exerciseSets.find(
      (record) => record.id == itemId
    )?.name;
  });
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
      setNo: 0,
      repsCount: 0,
      weight: 0,
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
    'flex flex-col text-2xl w-full border-2 border-slate-600 rounded-lg',
    className
  );
  return (
    <div className={cls}>
      <div className="flex w-full">
        <div className="flex-1 p-3">{workoutName}</div>
        <div className="flex flex-1 justify-end p-2 gap-3 items-center text-lg">
          <button
            className="px-3 shadow-lg py-1 rounded-lg bg-slate-600"
            onClick={addNewSet}
          >
            Add Set
          </button>
          <Trash2 onClick={deleteThisWorkOut} />
        </div>
      </div>
      <div className="flex p-5 text-lg gap-[2rem]">
        <p className="flex-[0.2]">Set</p>
        <p className="flex-1">Reps</p>
        <p className="flex-1">Weight (lbs)</p>
        <p className="flex-1">✓</p>
        <p className="flex-1">Timer</p>
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
  const inputCls = 'flex-1 min-w-0 p-2 border-1 border-slate-300 rounded-lg';
  const setValueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val: any = e.currentTarget.value;
    const name = e.currentTarget.name;
    if (name == 'finished') {
      val = parseInt(val) > 0 ? true : false;
    }
    dispatch(updateSets({ val, name, exerciseSetId, setId }));
  };
  return (
    <div className="flex p-5 text-lg gap-[2rem]">
      <div className="flex-[0.2]">{idx}</div>
      <input
        className={inputCls}
        value={repsCount}
        name="repsCount"
        onChange={setValueChangeHandler}
        type="number"
      />
      <input
        className={inputCls}
        value={weight}
        name="weight"
        onChange={setValueChangeHandler}
        type="number"
      />
      <input
        className={inputCls}
        value={finished ? 1 : 0}
        name="finished"
        onChange={setValueChangeHandler}
        type="text"
      />
      <SetTimer setId={setId} exerciseSetId={exerciseSetId} />
    </div>
  );
};

interface SetTimerInterface {
  setId: string;
  exerciseSetId: string;
}
const SetTimer: FC<SetTimerInterface> = ({ setId, exerciseSetId }) => {
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
  return <Timer className="flex-[1]" onChange={onChange} value={timeTaken} />;
};
