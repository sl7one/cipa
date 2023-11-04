import React, { useEffect } from "react";
import Icons from "../Icons/Icons";
import MenuPopupOrders from "../MenuPopupOrders/MenuPopupOrders";
import { animationsHelper } from "../../utils/animationsHelper";
import "./order-list-header.scss";

export default function OrdersListHeader({
  setFilter,
  filter,
  setFilterByOwner,
  filterByOwner,
  setSort,
  sort,
  setMainMark,
  mainMark: mark,
}) {
  const { menuOrder, mainMark, currentUserMark } = animationsHelper;

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
    if (mark === "init") {
      setMainMark(true);
      menuOrder.show();
      return;
    }
    setMainMark((prev) => !prev);
    !mark ? menuOrder.show() : menuOrder.hide();
  };

  useEffect(() => {
    if (mark === "init") return;
    !mark ? mainMark.hide() : mainMark.show();
  }, [mainMark, mark]);

  useEffect(() => {
    !filterByOwner ? currentUserMark.hide() : currentUserMark.show();
  }, [currentUserMark, filterByOwner]);

  return (
    <div className="orders-list-header">
      <div className="orders-item-header">
        <div className="orders-item-header__info-group">
          <label className="checkbox-label" htmlFor="main-mark">
            <input
              className="checkbox"
              type="checkbox"
              id="main-mark"
              onChange={onChange}
            />
            <div className="mark-wrapper" id={"main-mark"}>
              <Icons name="mark" />
            </div>
          </label>
          <span>
            <button
              type="button"
              onClick={() => onClickonClickSortDateOrTotal("date")}
            >
              <Icons name="sort" />
              Дата
            </button>
          </span>
          <div className="orders-item-header__search-block">
            <label className="orders-item-header__search-bar" htmlFor="search">
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
            <MenuPopupOrders filterByOwner={filterByOwner} />
          </span>
        </div>
        <div className="current-user-orders">
          <div className="checkbox-label" htmlFor="main-mark">
            <input
              className="checkbox"
              type="checkbox"
              id="current-user-mark"
              onChange={() => setFilterByOwner((prev) => !prev)}
            />
            <div className="mark-wrapper" id={"current-user-mark"}>
              <Icons name="mark" />
            </div>
          </div>
          <label htmlFor="current-user-mark">
            Отобразить только мои заказы
          </label>
        </div>
      </div>
    </div>
  );
}
