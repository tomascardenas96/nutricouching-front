import { useEffect, useState } from "react";
import apiClient from "../../auth/api/apiClient";

function useGetAllSpecialtiesByProfessional(professionalId) {
  const [specialties, setSpecialties] = useState([]);
  const [specialtiesError, setSpecialtiesError] = useState(null);
  const [specialtiesLoading, setSpecialtiesLoading] = useState(true);

  useEffect(() => {
    const getAllSpecialtiesByProfessional = async () => {
      try {
        if (!professionalId) {
          return;
        }

        const { data } = await apiClient.get(
          `/specialty/professional/${professionalId}`
        );

        setSpecialties(data);
      } catch (error) {
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
