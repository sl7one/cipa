import { useState } from "react";

export default function useSelectContext() {
  const [ref, setRef] = useState([]);
  console.log(ref);
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
      console.log(ref);
      ref[idx].current.setValue({ label: value, value });
    },
  };
}
