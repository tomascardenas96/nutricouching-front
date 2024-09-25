import { useEffect, useState } from "react";
import { HOST } from "../api/data";

function useGetProfessionals() {
  const [professionals, setProfessionals] = useState([]);
  const [professionalsLoading, setProfessionalsLoading] = useState(false);
  const [professionalsError, setProfessionalsError] = useState(false);

  useEffect(() => {
    const getAllProfessionals = async () => {
      setProfessionalsLoading(true);
      try {
        const response = await fetch(`${HOST}/professional`);
        const data = await response.json();

        if (data.error) {
          throw new Error(data.message);
        }

        setProfessionals(data);
      } catch (error) {
        console.error(error);
        setProfessionalsError(true);
      } finally {
        setProfessionalsLoading(false);
      }
    };

    getAllProfessionals();
  }, []);

  return { professionals, professionalsLoading, professionalsError };
}

export default useGetProfessionals;
