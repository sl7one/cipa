import React from "react";
import CreatableSelect from "react-select/creatable";

const selectStyles = () => ({
  control: (base, state) => ({
    ...base,
    // width: '100%',
    // minWidth: `${width}px`,
    // backgroundColor: ,
    // borderRadius: "10px",
    // height: "40px",
    border: "unset",
    borderBottom: "1px solid gray",
    borderRadius: "unset",
    transition: "border-color 350ms ease-in-out",
    boxShadow: state.isFocused ? "unset" : "unset",
    // borderColor: "white",
    fontSize: "14px",
    // ":hover": {
    //   borderColor: "#ff868e",
    // },
  }),
  menu: (base, state) => ({
    ...base,
    boxShadow: "unset",
    border: "unset",
    zIndex: 2,
    transition: "all 350ms ease-in-out",
    margin: "unset",
  }),

  menuList: (base, state) => ({
    ...base,
    color: "#8C8C8C",
    fontSize: "12px",
    zIndex: 2,
    backgroundColor: "rgb(240, 240, 240)",
    "::-webkit-scrollbar": {
      width: "10px",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: "#ff868e",
      borderRadius: "5px",
    },
    "::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
    // ":hover": {
    //   borderColor: "#ff868e",
    // },
  }),
  option: (base, state) => ({
    ...base,
    color: state.isActive ? "#8C8C8C" : "#8C8C8C",
    backgroundColor: "transparent",
    ":hover": {
      backgroundColor: "transparent",
    },
  }),
  indicatorSeparator: (base, state) => ({ ...base, display: "none" }),
  container: (base) => ({ ...base, flex: 1 }),
});

export default function SelectComponent({ placeholder, onChange, options }) {
  return (
    <CreatableSelect
      isClearable
      isSearchable
      options={options ? options : false}
      placeholder={placeholder}
      styles={selectStyles()}
      onChange={onChange}
    />
  );
}
