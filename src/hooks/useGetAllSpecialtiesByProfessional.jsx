import { useEffect, useState } from "react";
import { HOST } from "../api/data";

function useGetAllSpecialtiesByProfessional(professionalId) {
  const authToken = localStorage.getItem("authToken");

  const [specialties, setSpecialties] = useState([]);
  const [specialtiesError, setSpecialtiesError] = useState(null);
  const [specialtiesLoading, setSpecialtiesLoading] = useState(true);

  useEffect(() => {
    const getAllSpecialtiesByProfessional = async () => {
      try {
        if (!professionalId) {
          return;
        }

        const response = await fetch(
          `${HOST}/specialty/professional/${professionalId}`,
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

        setSpecialties(data);
      } catch (error) {
        console.error(error);
        setSpecialtiesError(error);
      } finally {
        setSpecialtiesLoading(false);
      }
    };

    getAllSpecialtiesByProfessional();
  }, [professionalId]);

  return { specialties, specialtiesError, specialtiesLoading, setSpecialties };
}

export default useGetAllSpecialtiesByProfessional;
