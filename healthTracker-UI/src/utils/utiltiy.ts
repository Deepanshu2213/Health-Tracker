export const getKeys = <T extends Object>(data: T): (keyof T)[] => {
  return Object.keys(data) as (keyof T)[];
};
