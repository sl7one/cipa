export const summaryHelper = ({ data }) => {
  if (!data) return null;
  const summaryData = {};

  for (const productItem in data) {
    const product = data[productItem];

    const { category, order, price } = product;

    if (summaryData[category]) {
      summaryData[category].totalOrder += Number(order);
      summaryData[category].totalSumm += Number(order) * Number(price);
    } else {
      summaryData[category] = {
        totalOrder: Number(order),
        totalSumm: Number(order) * Number(price),
      };
    }
  }

  const summary = Object.entries(summaryData).map(([category, data]) => ({
    category,
    totalOrder: data.totalOrder,
    totalSumm: data.totalSumm,
  }));

  return summary;
};
