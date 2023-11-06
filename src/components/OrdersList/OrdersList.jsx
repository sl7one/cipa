import React, { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./orders-list.scss";
import OrdersListInfoGroup from "../OrdersListInfoGroup/OrdersListInfoGroup";
import { animationsHelper } from "../../utils/animationsHelper";
import { setChecked, unsetChecked } from "../../store/ordersSlice";
import FunctionalButtons from "../FunctionalButtons/FunctionalButtons";
import OrdersListFunctionalButtons from "../OrdersListFunctionalButtons/OrdersListFunctionalButtons";
import OrdersListHeader from "../OrdersListHeader/OrdersListHeader";
import DialogModal from "../DialogModal/DialogModal";
import { deleteOrder } from "../../store/ordersActions";
import { Toast } from "../../context/toast-context";

export default function OrdersList() {
  const toast = useContext(Toast);
  const [order, setOrder] = useState({});
  const [filter, setFilter] = useState("");
  const [filterByOwner, setFilterByOwner] = useState(false);
  const [sort, setSort] = useState({ date: "init", total: "init" });
  const [mainMark, setMainMark] = useState("init");
  const orders = useSelector((state) => state.orders.orders);
  const currentUser = useSelector((state) => state.auth.user._id);
  const { orderModal, dialogModal, menuOrder } = animationsHelper;
  const dispatch = useDispatch();

  const items = useMemo(
    () =>
      orders
        .filter(({ isActive }) => isActive)
        .filter(({ owner }) => (!filterByOwner ? true : owner === currentUser)),
    [currentUser, filterByOwner, orders]
  );

  useEffect(() => {
    if (mainMark === "init") return;
    items.forEach(({ _id }) =>
      mainMark ? dispatch(setChecked(_id)) : dispatch(unsetChecked(_id))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, mainMark]);

  useEffect(() => {
    if (!items.length) {
      setMainMark(false);
      return;
    }

    items.forEach(({ isChecked, _id }) => {
      isChecked
        ? orderModal.infoGroup.mark.show("mark" + _id)
        : orderModal.infoGroup.mark.hide("mark" + _id);
    });
  }, [orderModal, items]);

  useEffect(() => {
    items.some(({ isChecked }) => isChecked)
      ? menuOrder.show()
      : menuOrder.hide();
  }, [menuOrder, items]);

  const confirmDelete = (order) => {
    setOrder(order);
    dialogModal.show();
  };

  const onClickYes = ({ _id }) => {
    dispatch(
      deleteOrder({
        data: _id,
        success: () => {
          toast.success("Заказ успешно удален");
          dialogModal.hide();
        },
        failed: (message) => toast.error(message),
      })
    );
  };

  return (
    <>
      <div className="orders-list-wrapper">
        <OrdersListHeader
          setFilter={setFilter}
          filter={filter}
          setFilterByOwner={setFilterByOwner}
          filterByOwner={filterByOwner}
          setSort={setSort}
          sort={sort}
          setMainMark={setMainMark}
          mainMark={mainMark}
        />
      </div>
      <div className="orders-list-wrapper">
        <ul className={"orders-list"}>
          {items
            .filter(({ client: { name, phone }, location }) => {
              if (!filter) {
                return true;
              } else {
                return (
                  name.includes(filter) ||
                  phone.includes(filter) ||
                  location?.location.includes(filter)
                );
              }
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
            .map(({ _id, owner, location, ...rest }) => (
              <li className="orders-item" key={_id}>
                <OrdersListInfoGroup
                  {...rest}
                  location={location?.location}
                  _id={_id}
                />
                <FunctionalButtons _id={_id}>
                  <OrdersListFunctionalButtons
                    {...rest}
                    _id={_id}
                    confirmDelete={confirmDelete}
                  />
                </FunctionalButtons>
                {owner === currentUser && (
                  <span className="current-user-marker"></span>
                )}
              </li>
            ))}
        </ul>
      </div>
      <DialogModal
        title="Подтвердите удаление заказа"
        onClickYes={() => onClickYes({ _id: order.id })}
      >
        <span>{order?.client?.name || ""}</span>
        <span>{order?.client?.phone || ""}</span>
        <span>{"Cумма " + order?.total || 0}</span>
      </DialogModal>
    </>
  );
}
