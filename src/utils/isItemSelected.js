export const isItemSelectedHelper = ({ products, id }) => {
  const [{ isSelected }] = products.filter((el) => el._id === id);

  return isSelected;
};
