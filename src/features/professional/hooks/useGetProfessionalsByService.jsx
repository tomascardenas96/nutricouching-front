import { useEffect, useState } from "react";
import { HOST } from "../../../api/data";

function useGetProfessionalsByService(serviceId) {
  const authToken = localStorage.getItem("authToken");

  const [professionalsByService, setProfessionalsByService] = useState([]);

  useEffect(() => {
    const getProfessionalsByService = async () => {
      try {
        const response = await fetch(
          `${HOST}/professional/service/${serviceId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
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
