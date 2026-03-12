import { useEffect, useState } from "react";
import apiClient from "../../auth/api/apiClient";

function useGetProfessionalsByService(serviceId) {
  const [professionalsByService, setProfessionalsByService] = useState([]);

  useEffect(() => {
    const getProfessionalsByService = async () => {
      try {
        const { data } = await apiClient.get(
          `/professional/service/${serviceId}`
        );
        setProfessionalsByService(data);
      } catch (error) {
        console.error(error);
      }
    };

    getProfessionalsByService();
  }, []);

  return { professionalsByService };
}

export default useGetProfessionalsByService;
