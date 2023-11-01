import React, { useState } from "react";
import Icons from "../Icons/Icons";
import "./poultry-fn-btn.scss";
import ModalOrderPoultryFunction from "../ModalOrderPoultryFunction/ModalOrderPoultryFunction";
import { animationsHelper } from "../../utils/animationsHelper";

export default function OrderPoultryFunctionBtn() {
  const [flag, setFlag] = useState(false);
  const { menuOrderPoultry } = animationsHelper;

  const onClick = () => {
    if (flag) {
      setFlag(false);
      menuOrderPoultry.hide();
    } else {
      setFlag(true);
      menuOrderPoultry.show();
    }
  };
  return (
    <>
      <button className="poultry-fn-btn" type="button" onClick={onClick}>
        <Icons name="dots" />
      </button>
      <ModalOrderPoultryFunction setFlag={setFlag} />
    </>
  );
}
