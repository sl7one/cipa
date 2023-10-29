import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./orders-list.scss";
import OrdersListInfoGroup from "../OrdersListInfoGroup/OrdersListInfoGroup";
import { animationsHelper } from "../../utils/animationsHelper";
import { setChecked, unsetChecked } from "../../store/ordersSlice";
import FunctionalButtons from "../FunctionalButtons/FunctionalButtons";
import OrdersListFunctionalButtons from "../OrdersListFunctionalButtons/OrdersListFunctionalButtons";
import OrdersListHeader from "../OrdersListHeader/OrdersListHeader";

export default function OrdersList() {
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState({ date: "init", total: "init" });
  const [marks, setMarks] = useState("init");
  const orders = useSelector((state) => state.orders.orders);
  const { orderModal } = animationsHelper;
  const dispatch = useDispatch();

  const items = useMemo(
    () => orders.filter(({ isActive }) => isActive),
    [orders]
  );

  useEffect(() => {
    if (marks === "init") return;
    items.forEach(({ _id }) =>
      marks ? dispatch(setChecked(_id)) : dispatch(unsetChecked(_id))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, marks]);

  useEffect(() => {
    items.forEach(({ isChecked, _id }) => {
      isChecked
        ? orderModal.infoGroup.mark.show("mark" + _id)
        : orderModal.infoGroup.mark.hide("mark" + _id);
    });
  }, [orders, orderModal, items]);

  return (
    <>
      <OrdersListHeader
        setFilter={setFilter}
        filter={filter}
        setSort={setSort}
        sort={sort}
        setMarks={setMarks}
        marks={marks}
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
              <OrdersListInfoGroup {...rest} id={_id} />
              <FunctionalButtons id={_id}>
                <OrdersListFunctionalButtons id={_id} />
              </FunctionalButtons>
            </li>
          ))}
      </ul>
    </>
  );
}
