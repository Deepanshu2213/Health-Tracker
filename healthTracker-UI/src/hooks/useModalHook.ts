import { useState } from 'react';

export const useModlaHooks = (
  defaultVal: boolean = false
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isOpen, setOpen] = useState<boolean>(defaultVal);
  return [isOpen, setOpen];
};
