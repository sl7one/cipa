import { useState } from "react";

export default function useSelectContext() {
  const [ref, setRef] = useState();
  return {
    setRef,
    resetSelectNameValue: () => ref.refName.current.clearValue(),
    resetSelectLoactionValue: () => ref.refLocation.current.clearValue(),
  };
}
