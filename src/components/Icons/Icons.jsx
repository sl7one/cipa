import React from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { TbPhone } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdKeyboardBackspace } from "react-icons/md";

import "./icons.scss";

export default function Icons({ name }) {
  const size = "1.25em";
  const iconsSet = {
    edit: <CiEdit color="orange" size={size} />,
    remove: <CiTrash color="red" size={size} />,
    phone: <TbPhone color="blue" size={size} />,
    hand: <GiReceiveMoney color="green" size={size} />,
    dots: <BiDotsVerticalRounded color="black" size={size} />,
    back: <MdKeyboardBackspace color="black" size={size} />,
  };

  return <span className="icon-wrapper">{iconsSet[name]}</span>;
}
