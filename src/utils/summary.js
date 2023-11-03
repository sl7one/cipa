export const summaryHelper = ({ data }) => {
  if (!data) return null;

  const entries = Object.entries(data).reduce(
    (acc, [_, { category, quantity, total, title, price }]) => {
      const totalByQuantity = acc?.[category]?.totalOrder || 0;
      const summByQuantity = totalByQuantity + Number(quantity);

      const totalBySumm = acc?.[category]?.totalSumm || 0;
      const totalSumm = total
        ? totalBySumm + Number(total)
        : totalBySumm + Number(quantity) * Number(price);

      const orders = acc?.[category]?.orders || [];
      orders.push({ title, quantity, total });

      acc = {
        ...acc,
        [category]: {
          totalOrder: summByQuantity,
          totalSumm: totalSumm,
          orders,
        },
      };
      return acc;
    },
    {}
  );

  const summary = Object.entries(entries).map(
    ([category, { totalOrder, totalSumm, orders }]) => {
      return {
        category,
        totalOrder,
        totalSumm,
        orders,
      };
    }
  );

  return summary;
};
