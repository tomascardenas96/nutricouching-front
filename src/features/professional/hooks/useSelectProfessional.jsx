import { useState } from "react";

function useSelectProfessional() {
  const [selectedProfessional, setSelectedProfessional] = useState(null);

  return { selectedProfessional, setSelectedProfessional };
}

export default useSelectProfessional;
