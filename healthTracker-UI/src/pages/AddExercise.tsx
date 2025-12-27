import { useState, type ChangeEvent, type FC } from 'react';
import wrappedComponent from '../utils/wrappedComponent';
import type { exerciseDataNew } from '../components/ExerciseDetails';
import { useSaveExerciseMutation } from '../store/apis/Exercise';
import { useResizeContext } from '../hooks/useResizeContext';

const AddExerciseMain: FC<{
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setOpen }) => {
  const [saveExercise, { data }] = useSaveExerciseMutation();
  const { width } = useResizeContext();
  if (data) {
    setOpen?.(false);
  }
  const [form, setFormData] = useState<exerciseDataNew>({
    name: '',
    muscleGroup: '',
    equipment: '',
    difficulty: '',
  });
  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const formSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    saveExercise(form);
  };
  const inputCls = 'flex-1 min-w-0 p-2 border-1 border-neutral-500 rounded-lg';
  return (
    <div
      className={`w-[100%] ${
        width < 1000 ? 'h-[50vh]' : 'h-[80vh]'
      } flex flex-col items-center`}
    >
      <h1 className="text-xl text-center p-2">Add New Exercise</h1>
      <form className="flex flex-col gap-[1rem] w-[70%] min-h-[10vh]">
        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="Add Name"
          className={inputCls}
          onChange={inputChange}
        />
        <input
          type="text"
          name="muscleGroup"
          value={form.muscleGroup}
          placeholder="Add Muscle Group"
          className={inputCls}
          onChange={inputChange}
        />
        <input
          type="text"
          name="equipment"
          value={form.equipment}
          placeholder="Add Equipment"
          className={inputCls}
          onChange={inputChange}
        />
        <input
          type="text"
          name="difficulty"
          value={form.difficulty}
          className={inputCls}
          placeholder="Add Difficulty"
          onChange={inputChange}
        />
        <div className="flex justify-center">
          <button
            className="text-lg bg-neutral-800 rounded-full font-semibold p-4 w-fit text-neutral-200 ml-1"
            type="submit"
            onClick={formSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export const AddExercise = wrappedComponent(AddExerciseMain, {
  light: false,
  className: 'm-2 p-2',
});
