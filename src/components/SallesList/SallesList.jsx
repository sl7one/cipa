import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import "./orders-list.scss";
import SallesListHeader from "../SallesListHeader/SallesListHeader";
import SallesListInfoGroup from "../SallesListInfoGroup/SallesListInfoGroup";

export default function SallesList() {
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState({ date: "init", total: "init" });
  const orders = useSelector((state) => state.orders.orders);

  const items = useMemo(
    () => orders.filter(({ isActive }) => !isActive),
    [orders]
  );

  return (
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
              <SallesListInfoGroup {...rest} id={_id} />
            </li>
          ))}
      </ul>
    </div>
  );
}
