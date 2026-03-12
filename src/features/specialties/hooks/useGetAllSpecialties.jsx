import { useEffect, useState } from "react";
import apiClient from "../../auth/api/apiClient";

function useGetAllSpecialties() {
  const [specialties, setSpecialties] = useState([]);
  const [loadingSpecialties, setLoadingSpecialties] = useState(false);
  const [errorSpecialties, setErrorSpecialties] = useState(null);

  useEffect(() => {
    const getSpecialties = async () => {
      setLoadingSpecialties(true);
      try {
        const { data } = await apiClient.get(`/specialty`);

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
