import React, { useContext, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./salles-list.scss";
import SallesListHeader from "../SallesListHeader/SallesListHeader";
import SallesListInfoGroup from "../SallesListInfoGroup/SallesListInfoGroup";
import { useNavigate } from "react-router-dom";
import { Toast } from "../../context/toast-context";
import { unsalleOrder } from "../../store/ordersActions";
import { animationsHelper } from "../../utils/animationsHelper";
import DialogModal from "../DialogModal/DialogModal";
import ModalOrderInfo from "../ModalOrderInfo/ModalOrderInfo";

export default function SallesList() {
  const [order, setOrder] = useState({});
  const [filter, setFilter] = useState("");
  const [filterByOwner, setFilterByOwner] = useState(false);
  const [sort, setSort] = useState({ date: "init", total: "init" });
  const [id, setId] = useState(false);
  const orders = useSelector((state) => state.orders.orders);
  const currentUser = useSelector((state) => state.auth.user._id);
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
      <div className="salles-page">
        <SallesListHeader
          setFilter={setFilter}
          filter={filter}
          setFilterByOwner={setFilterByOwner}
          filterByOwner={filterByOwner}
          setSort={setSort}
          sort={sort}
        />
        <ul className="salles-list">
          {items
            .filter(({ client: { name, phone }, location }) => {
              if (name.includes(filter)) {
                return true;
              }
              if (phone.includes(filter)) {
                return true;
              }

              if (location) {
                return location?.location?.includes(filter);
              }

              return false;
            })
            .filter(({ owner }) =>
              !filterByOwner ? true : owner === currentUser
            )
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
            .map(({ _id, owner, ...rest }) => (
              <li
                className={
                  owner === currentUser ? "salles-item owner" : "salles-item"
                }
                key={_id}
              >
                <SallesListInfoGroup
                  {...rest}
                  _id={_id}
                  confirmDelete={confirmDelete}
                  setId={setId}
                />
              </li>
            ))}
        </ul>
      </div>
      <ModalOrderInfo _id={id} />
      <DialogModal
        title="Подтвердите отменение продажи"
        onClickYes={() => onClickYes({ _id: order._id })}
      >
        <span>{order?.client?.name || ""}</span>
        <span>{order?.client?.phone || ""}</span>
        <span>{"Cумма " + order?.total || 0}</span>
      </DialogModal>
    </>
  );
}
