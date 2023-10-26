import { useState } from "react";

export default function useSelectContext() {
  const [ref, setRef] = useState([]);
  return {
    setRef,
    resetSelect: (idx) => {
      if (!idx) {
        ref.forEach((refItem) => {
          refItem.current.clearValue();
        });
        return;
      }

      ref[idx].current.clearValue();
    },
    setValue: ({ idx, value }) => {
      ref[idx].current.setValue({ label: value, value });
    },
  };
}
