import { useEffect, useState } from "react";
import { HOST } from "../../../api/data";

function useGetSpecialtiesByCategory(category) {
  const [specialties, setSpecialties] = useState([]);
  const [specialtiesLoading, setSpecialtiesLoading] = useState(true);
  const [specialtiesError, setSpecialtiesError] = useState(false);

  useEffect(() => {
    const getSpecialties = async () => {
      try {
        const response = await fetch(`${HOST}/specialty/category/${category}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(
            "Error al obtener las especialidades por ID de categoria"
          );
        }

        const data = await response.json();

        setSpecialties(data);
      } catch (error) {
        setSpecialtiesError(error);
      } finally {
        setSpecialtiesLoading(false);
      }
    };

    if (category) {
      getSpecialties();
    }
  }, [category]);

  return { specialties, specialtiesLoading, specialtiesError };
}

export default useGetSpecialtiesByCategory;
