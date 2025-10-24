import type { FC } from 'react';
import { getKeys } from '../utils/utiltiy';
import wrappedComponent from '../utils/wrappedComponent';
import type { exerciseMap } from '../pages/Exercise';

export interface exerciseData {
  id: number;
  name: string;
  muscleGroup: string;
  equipment: string;
  difficulty: string;
}

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
          const { [data.id]: _, ...rest } = prev;
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
      className={`flex flex-col ${
        isSelected
          ? 'text-cyan-400 border-cyan-500 border-3'
          : 'border-1 shadow-lg border-neutral-700'
      } rounded-xl py-[1.5rem]`}
      onClick={setSelection}
    >
      <div className="text-xl pb-4 px-3">{data.name}</div>
      <div className="flex flex-col gap-[0.5rem] px-4">
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

export const ExerciseDetails = wrappedComponent(ExerciseDetailsMain, {
  overlay: true,
});
