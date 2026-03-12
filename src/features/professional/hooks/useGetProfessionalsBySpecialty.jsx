import React, { useEffect, useState } from "react";
import apiClient from "../../auth/api/apiClient";

function useGetProfessionalsBySpecialty(selectedSpecialty) {
  const [professionalsBySpecialty, setProfessionalsBySpecialty] = useState([]);
  const [professionalsBySpecialtyLoading, setProfessionalsBySpecialtyLoading] =
    useState(false);
  const [professionalsBySpecialtyError, setProfessionalsBySpecialtyError] =
    useState(null);
  const [selectedProfessional, setSelectedProfessional] = useState(null);

  useEffect(() => {
    const getProfessionalsBySpecialty = async () => {
      setProfessionalsBySpecialtyLoading(true);
      try {
        if (selectedSpecialty) {
          const { data } = await apiClient.get(
            `/professional/specialty?id=${selectedSpecialty}`
          );
          setProfessionalsBySpecialty(data);
        }
      } catch (error) {
        setProfessionalsBySpecialtyError(error);
      } finally {
        setProfessionalsBySpecialtyLoading(false);
      }
    };

    getProfessionalsBySpecialty();
  }, [selectedSpecialty]);

  return {
    professionalsBySpecialty,
    professionalsBySpecialtyLoading,
    professionalsBySpecialtyError,
    setSelectedProfessional,
    selectedProfessional,
  };
}

export default useGetProfessionalsBySpecialty;
