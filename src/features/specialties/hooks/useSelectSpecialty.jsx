import { useState } from "react";

function useSelectSpecialty() {
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  const selectSpecialty = (specialty) => {
    setSelectedSpecialty(specialty);
  };

  return { selectSpecialty, selectedSpecialty };
}

export default useSelectSpecialty;
