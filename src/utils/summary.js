export const summary = ({ data, category = null }) => {
  if (!data) return { totalOrder: 0, totalSumm: 0 };

  const filtredArray = Object.entries(data).filter(([_, value]) => {
    if (!category) return true;
    return value?.category === category;
  });

  const isFalsyArray = filtredArray.some(
    ([_, { order = 0, price = 0 }]) =>
      Number(order) === 0 || Number(price) === 0
  );

  if (isFalsyArray) return { totalOrder: 0, totalSumm: 0 };

  return filtredArray.reduce(
    (acc, [_, value]) => {
      const { order = 0, price = 0 } = value;
      acc.totalOrder += Number(order);
      acc.totalSumm += Number(order) * Number(price);
      return acc;
    },
    { totalOrder: 0, totalSumm: 0 }
  );
};
