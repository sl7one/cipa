import React, { useContext, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./orders-list.scss";
import SallesListHeader from "../SallesListHeader/SallesListHeader";
import SallesListInfoGroup from "../SallesListInfoGroup/SallesListInfoGroup";
import { useNavigate } from "react-router-dom";
import { Toast } from "../../context/toast-context";
import { unsalleOrder } from "../../store/ordersActions";
import { animationsHelper } from "../../utils/animationsHelper";
import DialogModal from "../DialogModal/DialogModal";

export default function SallesList() {
  const [order, setOrder] = useState({});
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState({ date: "init", total: "init" });
  const orders = useSelector((state) => state.orders.orders);
  const navigate = useNavigate();
  const toast = useContext(Toast);
  const dispatch = useDispatch();
  const { dialogModal } = animationsHelper;

  const items = useMemo(
    () => orders.filter(({ isActive }) => !isActive),
    [orders]
  );

  const confirmDelete = (order) => {
    setOrder(order);
    dialogModal.show();
  };

  const onClickYes = ({ _id }) => {
    dispatch(
      unsalleOrder({
        data: _id,
        success: () => {
          toast.success("Заказ распроведен успешно");
          dialogModal.hide();
          navigate("/orders");
        },
        failed: (message) => toast.error(message),
      })
    );
  };

  return (
    <>
      <div className="salles-list">
        <SallesListHeader
          setFilter={setFilter}
          filter={filter}
          setSort={setSort}
          sort={sort}
        />
        <ul className="orders-list">
          {items
            .filter(({ client: { name, phone }, location }) => {
              if (!filter) {
                return true;
              } else {
                return (
                  name.includes(filter) ||
                  phone.includes(filter) ||
                  location.includes(filter)
                );
              }
            })
            .sort(({ date: dateA }, { date: dateB }) => {
              if (sort.date === "init") return 0;
              return sort.date === "asc"
                ? Date.parse(dateA) - Date.parse(dateB)
                : Date.parse(dateB) - Date.parse(dateA);
            })
            .sort(({ total: totalA }, { total: totalB }) => {
              if (sort.total === "init") return 0;
              return sort.total === "asc" ? totalA - totalB : totalB - totalA;
            })
            .map(({ _id, ...rest }) => (
              <li className="orders-item" key={_id}>
                <SallesListInfoGroup
                  {...rest}
                  id={_id}
                  confirmDelete={confirmDelete}
                />
              </li>
            ))}
        </ul>
      </div>
      <DialogModal
        title="Подтвердите отменение продажи"
        onClickYes={() => onClickYes({ _id: order.id })}
      >
        <span>{order?.client?.name || ""}</span>
        <span>{order?.client?.phone || ""}</span>
        <span>{"Cумма " + order?.total || 0}</span>
      </DialogModal>
    </>
  );
}