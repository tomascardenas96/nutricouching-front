import { useState } from "react";

function useSelectSpecialty() {
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  const selectSpecialty = (specialty) => {
    setSelectedSpecialty(specialty.specialtyId);
  };

  return { selectSpecialty, selectedSpecialty };
}

export default useSelectSpecialty;
