import { useEffect, useState } from "react";
import { HOST } from "../../../api/data";

function useGetAllPlans(user) {
  const [plans, setPlans] = useState([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [plansError, setPlansError] = useState(null);

  useEffect(() => {
    const getPlans = async () => {
      if (user) {
        const token = localStorage.getItem("authToken");
        getPlansWhenLoggedIn(token);
      } else {
        getPlansWhenLoggedOut();
      }
    };

    getPlans();
  }, [user]);

  const getPlansWhenLoggedIn = async (token) => {
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
    }
  };

  const getPlansWhenLoggedOut = async () => {
    try {
      const response = await fetch(`${HOST}/plan/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setPlans(data);
    } catch (error) {
      setPlansError(true);
    }
  };

  const flattedPlans = [
    ...(plans?.freePlans || []),
    ...(plans?.notPurchasedPlans || []),
  ];

  return { plans, setPlans, plansLoading, plansError, flattedPlans };
}

export default useGetAllPlans;
