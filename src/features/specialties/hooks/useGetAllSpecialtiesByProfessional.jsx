import { useEffect, useState } from "react";
import { HOST } from "../../../api/data";
import { useAuthUser } from "../../auth/hooks/useAuthUser";

function useGetAllSpecialtiesByProfessional() {
  const { user } = useAuthUser();
  const authToken = localStorage.getItem("authToken");

  const [specialties, setSpecialties] = useState([]);
  const [specialtiesError, setSpecialtiesError] = useState(null);
  const [specialtiesLoading, setSpecialtiesLoading] = useState(true);

  useEffect(() => {
    const getAllSpecialtiesByProfessional = async () => {
      try {
        if (!user.professional.professionalId) {
          return;
        }

        const response = await fetch(
          `${HOST}/specialty/professional/${user.professional.professionalId}`,
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

        console.log(data);

        setSpecialties(data);
      } catch (error) {
        setSpecialtiesError(error);
      } finally {
        setSpecialtiesLoading(false);
      }
    };

    getAllSpecialtiesByProfessional();
  }, [user.professional.professionalId]);

  return { specialties, specialtiesError, specialtiesLoading, setSpecialties };
}

export default useGetAllSpecialtiesByProfessional;
