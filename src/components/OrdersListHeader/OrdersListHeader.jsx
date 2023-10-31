import React from "react";
import Icons from "../Icons/Icons";
import MenuPopupOrders from "../MenuPopupOrders/MenuPopupOrders";
import { animationsHelper } from "../../utils/animationsHelper";

export default function OrdersListHeader({
  setFilter,
  filter,
  setSort,
  sort,
  setMarks,
  marks,
}) {
  const { menu } = animationsHelper;

  const onClickonClickSortDateOrTotal = (type) => {
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
      if (marks === "init") menu.show();
      return;
    }
    setMarks((prev) => !prev);
    !marks ? menu.show() : menu.hide();
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
            <button
              type="button"
              onClick={() => onClickonClickSortDateOrTotal("date")}
            >
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
            <button
              type="button"
              onClick={() => onClickonClickSortDateOrTotal("total")}
            >
              <Icons name="sort" />
              Сумма
            </button>
          </span>
          <span className="dots">
            <Icons name="dots" />
            <MenuPopupOrders />
          </span>
        </div>
      </div>
    </div>
  );
}
