import { useState } from "react";

function useSelectProfessional() {
  const [selectedProfessional, setSelectedProfessional] = useState(null);

  const handleSelectProfessional = (professional) => {
    setSelectedProfessional(professional);
  };

  return { selectedProfessional, handleSelectProfessional };
}

export default useSelectProfessional;
