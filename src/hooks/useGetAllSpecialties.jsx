import { useEffect, useState } from "react";
import { HOST } from "../api/data";

function useGetAllSpecialties() {
  const authToken = localStorage.getItem("authToken");

  const [specialties, setSpecialties] = useState([]);
  const [loadingSpecialties, setLoadingSpecialties] = useState(false);
  const [errorSpecialties, setErrorSpecialties] = useState(null);

  useEffect(() => {
    const getSpecialties = async () => {
      setLoadingSpecialties(true);
      try {
        const response = await fetch(`${HOST}/specialty`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch specialties");
        }

        setSpecialties(data);
      } catch (error) {
        setErrorSpecialties(error.message);
      } finally {
        setLoadingSpecialties(false);
      }
    };

    getSpecialties();
  }, []);

  return { specialties, loadingSpecialties, errorSpecialties, setSpecialties };
}

export default useGetAllSpecialties;
