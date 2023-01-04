export const strToIntArr = (arr: string[]) => arr.map(el => parseInt(el));

export const average = (arr: number[], floatingPoint?: number) => {
  const avg = arr.reduce((prev, val) => prev + val, 0) / arr.length;
  if (floatingPoint) {
    const rounding = 10 ** floatingPoint;
    return Math.floor(avg * rounding) / rounding;
  }
  return avg;
};
