export const selectStyles = () => ({
  control: (base, state) => ({
    ...base,
    border: "unset",
    borderBottom: "1px solid gray",
    borderRadius: "unset",
    transition: "border-color 350ms ease-in-out",
    boxShadow: state.isFocused ? "unset" : "unset",
    fontSize: "14px",
    textTransform: "capitalize",
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
