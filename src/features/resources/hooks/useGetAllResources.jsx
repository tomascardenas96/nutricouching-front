import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { toast } from "sonner";
import { HOST, WEBSOCKET_HOST } from "../../../api/data";
import { useAuthUser } from "../../auth/hooks/useAuthUser";

function useGetAllResources(setSelectedResource, setIsMoreInfoModalOpen) {
  const [resources, setResources] = useState([]);
  const [resourcesLoading, setResourcesLoading] = useState(true);
  const [resourcesError, setResourcesError] = useState(null);

  const { user } = useAuthUser();

  useEffect(() => {
    const getResources = async () => {
      if (user) {
        const token = localStorage.getItem("authToken");
        getResourcesWhenLoggedIn(token);
      } else {
        getResourcesWhenLoggedOut();
      }
    };

    getResources();
  }, [user]);

  useEffect(() => {
    if (!user || resources.length === 0) {
      return;
    }

    const socket = io(`${WEBSOCKET_HOST}`, {
      query: { userId: user.userId },
    });

    socket.on("purchasedResource", (resourceId) => {
      toast.success("El plán ha sido agregado a tu colección");

      setResources((prev) => {
        const justPurchasedResource = prev.notPurchasedResources.find(
          (res) => res.resourceId === resourceId
        );
        prev.purchasedResources.push(justPurchasedResource);

        const notPurchasedResources = prev.notPurchasedResources.filter(
          (res) => res.resourceId !== resourceId
        );

        setSelectedResource(null);
        setIsMoreInfoModalOpen(false);

        return {
          freePlans: prev.freePlans,
          purchasedResources: prev.purchasedResources,
          notPurchasedResources,
        };
      });
    });

    return () => {
      socket.off("purchasedResource");
      socket.disconnect();
    };
  }, [user, resources]);

  const getResourcesWhenLoggedIn = async (token) => {
    try {
      const response = await fetch(`${HOST}/resource`, {
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

      setResources(data);
    } catch (error) {
      setResourcesError(true);
    } finally {
      setResourcesLoading(false);
    }
  };

  const getResourcesWhenLoggedOut = async () => {
    try {
      const response = await fetch(`${HOST}/resource/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setResources(data);
    } catch (error) {
      setResourcesError(true);
    }
  };

  const flattedResources = [
    ...(resources?.freePlans || []),
    ...(resources?.notPurchasedPlans || []),
    ...(resources?.purchasedPlans || []),
  ];

  return {
    resources,
    setResources,
    resourcesLoading,
    resourcesError,
    flattedResources,
  };
}

export default useGetAllResources;
