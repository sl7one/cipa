import React from "react";
import Icons from "../Icons/Icons";

export default function OrdersListInfoGroupHeader({
  setFilter,
  filter,
  setSort,
  sort,
  setMarks,
  marks,
}) {
  const onClick = (type) => {
    if (type === "date") {
      sort.date === "desc"
        ? setSort({ date: "asc", total: "init" })
        : setSort({ date: "desc", total: "init" });
    }

    if (type === "total") {
      sort.total === "desc"
        ? setSort({ date: "init", total: "asc" })
        : setSort({ date: "init", total: "desc" });
    }
  };

  const onChange = () => {
    if (marks === "init") {
      setMarks(true);
      return;
    }
    setMarks((prev) => !prev);
  };

  return (
    <div className="orders-list-header">
      <div className="orders-item-header">
        <div className="orders-item__info-group">
          <div className="checkbox-label">
            <label
              className={marks === "init" ? null : marks ? "checked" : null}
              htmlFor="marks"
            ></label>
            <input
              className="checkbox"
              type="checkbox"
              onChange={onChange}
              id="marks"
            />
          </div>

          <span>
            <button type="button" onClick={() => onClick("date")}>
              <Icons name="sort" />
              Дата
            </button>
          </span>
          <div className="orders-item__info">
            <label className="orders-item__info-search" htmlFor="search">
              <Icons name="search" />
              <input
                type="text"
                id="serch"
                onChange={({ target: { value } }) =>
                  setFilter(value.trim().toLowerCase())
                }
                value={filter}
                placeholder="Имя, телефон или локация"
              />
            </label>
          </div>
          <span>
            <button type="button" onClick={() => onClick("total")}>
              <Icons name="sort" />
              Сумма
            </button>
          </span>
          <span>
            <Icons name="dots" />
          </span>
        </div>
      </div>
    </div>
  );
}
