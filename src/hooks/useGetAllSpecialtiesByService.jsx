import React, { useEffect, useState } from "react";
import { HOST } from "../api/data";

function useGetAllSpecialtiesByService(selectedService) {
  const [specialties, setSpecialties] = useState([]);
  const [specialtiesLoading, setSpecialtiesLoading] = useState(false);
  const [specialtiesError, setSpecialtiesError] = useState(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  useEffect(() => {
    const getAllSpecialties = async () => {
      if (selectedService) {
        setSpecialtiesLoading(true);
        try {
          const response = await fetch(
            `${HOST}/specialty/service/${selectedService.serviceId}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );

          const data = await response.json();

          if (data.error) {
            console.error(data);
            throw new Error(data.message);
          }

          setSpecialties(data);
        } catch (error) {
          setSpecialtiesError(error);
        } finally {
          setSpecialtiesLoading(false);
        }
      }
    };

    getAllSpecialties();
  }, [selectedService]);

  return {
    specialties,
    specialtiesLoading,
    specialtiesError,
    selectedSpecialty,
    setSelectedSpecialty,
  };
}

export default useGetAllSpecialtiesByService;
