import { useEffect, useState } from "react";
import apiClient from "../../auth/api/apiClient";

function useGetLatestViands() {
  const [latestViands, setLatestViands] = useState([]);
  const [latestViandsLoading, setLatestViandsLoading] = useState(true);
  const [latestViandsError, setLatestViandsError] = useState(false);

  useEffect(() => {
    const getLatestViands = async () => {
      try {
        const { data } = await apiClient.get("/viand/latest");
        setLatestViands(data);
      } catch {
        setLatestViandsError(true);
      } finally {
        setLatestViandsLoading(false);
      }
    };

    getLatestViands();
  }, []);

  return { latestViands, latestViandsLoading, latestViandsError };
}

export default useGetLatestViands;
