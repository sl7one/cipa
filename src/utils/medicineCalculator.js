export const medicineCalculator = (count) => {
  if (!count) return 1;
  const medicine = Math.round(count / 50);
  return medicine;
};
