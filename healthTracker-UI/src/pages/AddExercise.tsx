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
  const inputCls = 'flex-1 w-full bg-neutral-900/50 border border-white/10 text-white placeholder-neutral-500 p-4 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all shadow-inner';
  return (
    <div
      className={`w-[100%] flex flex-col items-center justify-center p-6 ${
        width < 1000 ? 'min-h-[50vh]' : 'min-h-[80vh]'
      }`}
    >
      <div className="w-full max-w-lg backdrop-blur-2xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-8 lg:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <h1 className="text-3xl font-light text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-300">Add New Exercise</h1>
        <form className="flex flex-col gap-[1.2rem] w-full relative z-10">
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
        <div className="flex justify-center mt-6">
          <button
            className="text-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] rounded-xl font-semibold px-10 py-3 w-full text-white transition-all transform hover:-translate-y-0.5"
            type="submit"
            onClick={formSubmit}
          >
            Submit
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export const AddExercise = wrappedComponent(AddExerciseMain, {
  light: false,
  className: 'm-2 p-2',
});
