import { useEffect, useState } from "react";
import { HOST } from "../../../api/data";
import { useAuthUser } from "../../auth/hooks/useAuthUser";

function useGetAvailabilitiesByProfessional() {
  const authToken = localStorage.getItem("authToken");
  const { user } = useAuthUser();
  const professionalId = user?.professional?.professionalId;

  const [availabilities, setAvailabilities] = useState([]);
  const [availabilitiesLoading, setAvailabilitiesLoading] = useState(false);
  const [availabilitiesError, setAvailabilitiesError] = useState(null);

  useEffect(() => {
    const getAvailabilities = async () => {
      setAvailabilitiesLoading(true);
      try {
        const response = await fetch(
          `${HOST}/availability/professional/${professionalId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setAvailabilities(data);
      } catch (error) {
        console.error(error);
        setAvailabilitiesError(error);
      } finally {
        setAvailabilitiesLoading(false);
      }
    };

    getAvailabilities();
  }, [professionalId]);

  return {
    availabilities,
    availabilitiesLoading,
    availabilitiesError,
    setAvailabilities,
  };
}

export default useGetAvailabilitiesByProfessional;
