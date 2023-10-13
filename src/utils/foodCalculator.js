export const foodCalculator = (count) => {
  const totalStart = 1 * count;
  const totalGrow = 2.5 * count;
  const totalFinish = 3 * count;

  return {
    startCount: Math.round(totalStart / 25),
    growCount: Math.round(totalGrow / 25),
    finishCount: Math.round(totalFinish / 25),
  };
};
