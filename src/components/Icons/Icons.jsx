import React from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { TbPhone, TbArrowsSort } from "react-icons/tb";
import { GiReceiveMoney, GiCheckMark } from "react-icons/gi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdKeyboardBackspace } from "react-icons/md";
import { CgLogOut, CgSearchLoading } from "react-icons/cg";
import {
  AiOutlineBarChart,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlinePlus,
} from "react-icons/ai";
import { BsInfo } from "react-icons/bs";

import "./icons.scss";

export default function Icons({ name, color = null }) {
  const size = "1.25em";
  const iconsSet = {
    edit: <CiEdit color={color || "orange"} size={size} />,
    remove: <CiTrash color={color || "red"} size={size} />,
    phone: <TbPhone color={color || "blue"} size={size} />,
    hand: <GiReceiveMoney color={color || "green"} size={size} />,
    dots: <BiDotsVerticalRounded color={color || "black"} size={size} />,
    back: <MdKeyboardBackspace color={color || "black"} size={size} />,
    mark: <GiCheckMark color={color || "yellowgreen"} size={size} />,
    sort: <TbArrowsSort color={color || "blue"} size={size} />,
    search: <CgSearchLoading color={color || "blue"} size={size} />,
    logout: <CgLogOut color={color || "black"} size={size} />,
    chart: <AiOutlineBarChart color={color || "black"} size={size} />,
    info: <BsInfo color={color || "black"} size={size} />,
    eyeOpen: <AiOutlineEye color={color || "black"} size={size} />,
    eyeClose: <AiOutlineEyeInvisible color={color || "black"} size={size} />,
    plus: <AiOutlinePlus color={color || "black"} size={size} />,
  };

  return <span className="icon-wrapper">{iconsSet[name]}</span>;
}
