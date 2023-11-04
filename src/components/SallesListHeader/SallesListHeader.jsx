import React, { useEffect } from "react";
import Icons from "../Icons/Icons";
import { animationsHelper } from "../../utils/animationsHelper";

export default function SallesListHeader({
  setFilter,
  filter,
  setSort,
  sort,
  setFilterByOwner,
  filterByOwner,
}) {
  const { currentUserMark } = animationsHelper;

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

  useEffect(() => {
    !filterByOwner ? currentUserMark.hide() : currentUserMark.show();
  }, [currentUserMark, filterByOwner]);

  return (
    <div className="orders-list-header">
      <div className="orders-item-header">
        <div className="orders-item__info-group">
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
          <label htmlFor="current-user-mark">Отобразить только продажи</label>
        </div>
      </div>
    </div>
  );
}
