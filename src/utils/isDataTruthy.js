export const isDataTruthyHelper = ({ data, key }) => {
  if (Object.values(data).length === 0) return false;
  const isDataTruthy = Object.values(data).every((el) => Number(el[key]) > 0);

  return isDataTruthy;
};
