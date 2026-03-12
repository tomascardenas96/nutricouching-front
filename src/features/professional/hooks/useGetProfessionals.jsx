import { useEffect, useState } from "react";
import apiClient from "../../auth/api/apiClient";

function useGetProfessionals() {
  const [professionals, setProfessionals] = useState([]);
  const [professionalsLoading, setProfessionalsLoading] = useState(false);
  const [professionalsError, setProfessionalsError] = useState(false);

  useEffect(() => {
    const getAllProfessionals = async () => {
      setProfessionalsLoading(true);
      try {
        const { data } = await apiClient.get("/professional");
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

  return {
    professionals,
    professionalsLoading,
    professionalsError,
    setProfessionals,
  };
}

export default useGetProfessionals;
