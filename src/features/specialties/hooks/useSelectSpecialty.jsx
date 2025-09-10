import { useState } from "react";

function useSelectSpecialty() {
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  const selectSpecialty = (specialty) => {
    setSelectedSpecialty(specialty);
  };

  return { selectedSpecialty, setSelectedSpecialty, selectSpecialty };
}

export default useSelectSpecialty;
