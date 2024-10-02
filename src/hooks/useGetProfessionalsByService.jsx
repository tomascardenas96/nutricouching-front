import { useEffect, useState } from "react";
import { HOST } from "../api/data";

function useGetProfessionalsByService(serviceId) {
  const [professionalsByService, setProfessionalsByService] = useState([]);

  useEffect(() => {
    const getProfessionalsByService = async () => {
      try {
        const response = await fetch(
          `${HOST}/professional/service?id=${serviceId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        if (data.error) {
          throw new Error(error.message);
        }

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