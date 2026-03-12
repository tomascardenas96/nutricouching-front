import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../auth/hooks/useAuth";
import { useSSEEvent } from "../../../services/useSSEEvent";
import apiClient from "../../auth/api/apiClient";

function useGetAllResources(setSelectedResource, setIsMoreInfoModalOpen) {
  const [resources, setResources] = useState([]);
  const [resourcesLoading, setResourcesLoading] = useState(true);
  const [resourcesError, setResourcesError] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    const getResources = async () => {
      if (user) {
        getResourcesWhenLoggedIn();
      } else {
        getResourcesWhenLoggedOut();
      }
    };

    getResources();
  }, [user]);

  // El backend emite afterPurchaseNotify con service:"resource_download" al comprar un recurso
  useSSEEvent("afterPurchaseNotify", (data) => {
    if (data.service !== "resource_download" || data.status !== "approved") return;
    toast.success("El recurso ha sido agregado a tu colección");
    setSelectedResource(null);
    setIsMoreInfoModalOpen(false);
    // Refetch para obtener el estado actualizado del servidor
    if (user) getResourcesWhenLoggedIn();
  });

  const getResourcesWhenLoggedIn = async () => {
    try {
      const { data } = await apiClient.get("/resource");
      setResources(data);
    } catch (error) {
      setResourcesError(true);
    } finally {
      setResourcesLoading(false);
    }
  };

  const getResourcesWhenLoggedOut = async () => {
    try {
      const { data } = await apiClient.get("/resource/all");
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
