import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Icons from "../Icons/Icons";
import { animationsHelper } from "../../utils/animationsHelper";
import SummaryStats from "../SummaryStats/SummaryStats";
import "./stats-payload.scss";
import gsap from "gsap";

export default function StatsPayload() {
  const data = useSelector((state) => state.orders.orders);
  const { stats } = animationsHelper;
  const [flag, setFlag] = useState(false);

  const filtredArray = useMemo(
    () => Object.values(data).filter(({ isActive }) => isActive),
    [data]
  );

  const normalizeData = useMemo(() => {
    return filtredArray
      .map(({ order }) => order)
      .flat()
      .reduce((acc, { _id, quantity, total, ...rest }) => {
        acc = {
          ...acc,
          [_id]:
            _id in acc
              ? {
                  ...rest,
                  quantity: Number(acc[_id].quantity) + Number(quantity),
                  total: Number(acc[_id].total) + Number(total),
                }
              : { ...rest, quantity, total },
        };
        return acc;
      }, {});
  }, [filtredArray]);

  const onClick = () => {
    if (flag) {
      setFlag(false);
      stats.hide();
      gsap.to("#arrow", { rotate: 90 });
    } else {
      setFlag(true);
      stats.show();
      gsap.to("#arrow", { rotate: 270 });
    }
  };

  return (
    <>
      {!filtredArray.length ? null : (
        <div className="stats-payload" onClick={onClick}>
          <h2>
            <div id="arrow">
              <Icons name="back" />
            </div>
            <Icons name="chart" />
            <p>Нагрузка</p>
          </h2>
          <SummaryStats data={normalizeData} />
        </div>
      )}
    </>
  );
}
