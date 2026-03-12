import React, { useEffect, useState } from "react";
import apiClient from "../../auth/api/apiClient";

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
          const { data } = await apiClient.get(
            `/specialty/service/${selectedService.serviceId}`
          );

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
