import type { FC } from 'react';
import { getKeys } from '../utils/utiltiy';
import type { exerciseMap } from '../pages/Exercise';

export interface exerciseData {
  id: number;
  name: string;
  muscleGroup: string;
  equipment: string;
  difficulty: string;
}

export type exerciseDataNew = Omit<exerciseData, 'id'>;

interface ExerciseDetailsProps {
  data: exerciseData;
  id: number;
  setSelected?: React.Dispatch<React.SetStateAction<exerciseMap>>;
  isSelected?: boolean;
}
export const ExerciseDetailsMain: FC<ExerciseDetailsProps> = ({
  id,
  data,
  isSelected,
  setSelected,
}) => {
  let headings = getKeys(data);
  let headingValues: any = {
    muscleGroup: 'Muscle Group',
    equipment: 'Equipment',
    difficulty: 'Difficulty',
  };

  //{ ...prev, [data.id]: data }
  headings = headings.filter(
    (heading) => !['name', 'id', 'createdAt', 'updatedAt'].includes(heading)
  );
  const setSelection = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (setSelected) {
      setSelected((prev) => {
        if (prev[data.id] != null) {
          const { [data.id]: v2, ...rest } = prev;
          return rest;
        }
        return { ...prev, [data.id]: data };
      });
    }
    e.preventDefault();
  };
  return (
    <div
      key={id}
      className={`flex flex-col shrink-0 ${
        isSelected
          ? 'text-fuchsia-300 border-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.3)] bg-fuchsia-500/10'
          : 'border-white/10 shadow-lg bg-white/5 hover:bg-white/10 hover:border-white/30 text-neutral-200'
      } border rounded-2xl py-[1.5rem] backdrop-blur-xl transition-all duration-300 cursor-pointer`}
      onClick={setSelection}
    >
      <div className="text-2xl font-semibold pb-4 px-5 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-300 tracking-wide">{data.name}</div>
      <div className="flex flex-col gap-[0.8rem] px-5 text-lg">
        {headings.map((heading) => {
          return (
            <div className="flex w-full">
              <p className="flex-1 text-start">{headingValues[heading]}</p>
              <p className="flex-1 text-end">{data[heading]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const ExerciseDetails = ExerciseDetailsMain;
