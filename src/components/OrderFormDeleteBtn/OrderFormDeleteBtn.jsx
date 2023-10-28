import React from "react";
import { useDispatch } from "react-redux";
import { unsetSelectedProducts } from "../../store/productsSlice";
import { deleteFormDataRecord } from "../../store/ordersSlice";

export default function OrderFormDeleteBtn({ id }) {
  const dispatch = useDispatch();

  const onClicDelete = (id) => {
    dispatch(unsetSelectedProducts(id));
    dispatch(deleteFormDataRecord(id));
  };
  return (
    <button type="button" onClick={() => onClicDelete(id)}>
      x
    </button>
  );
}
