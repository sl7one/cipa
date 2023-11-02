import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Icons from "../Icons/Icons";
import { animationsHelper } from "../../utils/animationsHelper";
import SummaryStats from "../SummaryStats/SummaryStats";
import "./stats-payload.scss";

export default function StatsPayload() {
  const data = useSelector((state) => state.orders.orders);
  const { stats } = animationsHelper;
  const [flag, setFlag] = useState(false);

  const filtredArray = useMemo(
    () => Object.values(data).filter(({ isActive }) => isActive),
    [data]
  );

  const normalizeData = useMemo(() => {
    const getOrdersArray = filtredArray.map(({ order }) => order).flat();
    return getOrdersArray.reduce(
      (acc, { _id, ...rest }) => (acc = { ...acc, [_id]: rest }),
      {}
    );
  }, [filtredArray]);

  const onClick = () => {
    if (flag) {
      setFlag(false);
      stats.hide();
    } else {
      setFlag(true);
      stats.show();
    }
  };

  return (
    <>
      {!filtredArray.length ? null : (
        <div className="stats-payload" onClick={onClick}>
          <h2>
            <Icons name="chart" /> Нагрузка
          </h2>
          <SummaryStats data={normalizeData} />
        </div>
      )}
    </>
  );
}
