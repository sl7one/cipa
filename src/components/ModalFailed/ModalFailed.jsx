import React, { useEffect } from "react";
import "./modal-failed.scss";
import { useDispatch, useSelector } from "react-redux";
import { resetOrderErrors } from "../../store/ordersSlice";
import { animationsHelper } from "../../utils/animationsHelper";

const ModalFailed = () => {
  const { errorModal } = animationsHelper;
  const ordersError = useSelector((state) => state.orders.error);
  const productsError = useSelector((state) => state.products.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (ordersError || productsError) errorModal.show();
  }, [ordersError, productsError, errorModal]);

  const onClickClose = () => {
    dispatch(resetOrderErrors());
    errorModal.hide();
  };

  const error = ordersError || productsError;

  return (
    <div className="modal-failed">
      <div className="egg"></div>
      <button className="close" type="button" onClick={onClickClose}>
        x
      </button>

      <h2>{error.statusCode + " " + error}</h2>
      <ol>
        {Array.isArray(error.message)
          ? error.message.map((el) => <li key={el}>{el}</li>)
          : error.message}
      </ol>
    </div>
  );
};

export default ModalFailed;
