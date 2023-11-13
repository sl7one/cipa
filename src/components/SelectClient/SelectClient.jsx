import React from "react";
import { useSelector } from "react-redux";

import Select from "react-select";
import { selectStyles } from "../../utils/selectStyles";
import "./select-client.scss";

export default function SelectClient({ onChange, placeholder }) {
  const clients = useSelector((state) => state.clients.clients);

  return (
    <Select
      isClearable
      isSearchable
      options={clients.map((el) => ({
        label: (
          <>
            <span className="select-options-name">{el.name}</span>
            <span className="select-options-phone">{el.phone}</span>
          </>
        ),
        value: el.name + "," + el.phone + "," + el._id,
      }))}
      placeholder={placeholder}
      styles={selectStyles()}
      onChange={onChange}
    />
  );
}
