export const summaryHelper = ({ data }) => {
  if (!data) return null;
  const summaryData = {};

  for (const productItem in data) {
    const product = data[productItem];

    const { category, quantity, price } = product;

    if (summaryData[category]) {
      summaryData[category].totalOrder += Number(quantity);
      summaryData[category].totalSumm += Number(quantity) * Number(price);
    } else {
      summaryData[category] = {
        totalOrder: Number(quantity),
        totalSumm: Number(quantity) * Number(price),
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
