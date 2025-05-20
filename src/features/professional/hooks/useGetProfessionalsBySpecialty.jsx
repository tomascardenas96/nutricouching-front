import React, { useEffect, useState } from "react";
import { HOST } from "../../../api/data";

function useGetProfessionalsBySpecialty(selectedSpecialty) {
  const authToken = localStorage.getItem("authToken");

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
          const response = await fetch(
            `${HOST}/professional/specialty?id=${selectedSpecialty}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
              },
            }
          );

          const data = await response.json();

          if (data.error) {
            console.error(data);
            throw new Error(data.message);
          }

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
