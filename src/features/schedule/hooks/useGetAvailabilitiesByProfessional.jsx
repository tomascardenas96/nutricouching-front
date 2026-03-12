import { useEffect, useState } from "react";
import apiClient from "../../auth/api/apiClient";

function useGetAvailabilitiesByProfessional(professionalId) {
  const [availabilities, setAvailabilities] = useState([]);
  const [availabilitiesLoading, setAvailabilitiesLoading] = useState(false);
  const [availabilitiesError, setAvailabilitiesError] = useState(null);

  useEffect(() => {
    const getAvailabilities = async () => {
      setAvailabilitiesLoading(true);
      try {
        const { data } = await apiClient.get(
          `/availability/professional/${professionalId}`
        );

        setAvailabilities(data);
      } catch (error) {
        setAvailabilitiesError(error);
      } finally {
        setAvailabilitiesLoading(false);
      }
    };

    getAvailabilities();
  }, [professionalId]);

  const isAvailabilitiesListEmpty = Object.keys(availabilities).length === 0;

  return {
    availabilities,
    availabilitiesLoading,
    availabilitiesError,
    setAvailabilities,
    isAvailabilitiesListEmpty,
  };
}

export default useGetAvailabilitiesByProfessional;
