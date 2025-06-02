import { useState } from "react";

function useSelectViand() {
  const [selectedViand, setSelectedViand] = useState(false);

  const selectViand = (viand) => {
    setSelectedViand(viand);
  };

  return { selectViand, selectedViand };
}

export default useSelectViand;
