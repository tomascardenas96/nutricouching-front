import { useEffect, useState } from "react";
import { HOST } from "../api/data";

function useGetAllPlans() {
  const [plans, setPlans] = useState([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [plansError, setPlansError] = useState(null);

  useEffect(() => {
    const getPlans = async () => {
      const token = localStorage.getItem("authToken");

      try {
        const response = await fetch(`${HOST}/plan`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setPlans(data);
      } catch (error) {
        setPlansError(true);
      } finally {
        setPlansLoading(false);
      }
    };

    getPlans();
  }, []);

  return { plans, plansLoading, plansError };
}

export default useGetAllPlans;
