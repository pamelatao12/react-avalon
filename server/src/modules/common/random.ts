export const randomInt = (min: number, max: number): number => {
  const diff = max - min + 1;
  return min + Math.floor(Math.random() * diff);
};
