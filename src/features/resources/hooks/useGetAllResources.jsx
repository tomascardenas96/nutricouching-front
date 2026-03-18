import { useEffect } from "react";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../auth/hooks/useAuth";
import { useSSEEvent } from "../../../services/useSSEEvent";
import apiClient from "../../auth/api/apiClient";

function useGetAllResources(setSelectedResource, setIsMoreInfoModalOpen) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const {
    data: resources = null,
    isLoading: resourcesLoading,
    isError: resourcesError,
    refetch,
  } = useQuery({
    queryKey: ["resources", user?.userId],
    queryFn: () => apiClient.get("/resource/all").then((r) => r.data),
  });

  useEffect(() => {
    if (resourcesError) {
      toast.error("Error al cargar los recursos");
    }
  }, [resourcesError]);

  useSSEEvent("afterPurchaseNotify", (data) => {
    if (data.service !== "resource_download" || data.status !== "approved")
      return;
    toast.success("El recurso ha sido agregado a tu colección");
    setSelectedResource(null);
    setIsMoreInfoModalOpen(false);
    refetch();
  });

  const flattedResources = [
    ...(resources?.freeResources || []),
    ...(resources?.notPurchasedResources || []),
    ...(resources?.purchasedResources || []),
  ];

  return {
    resources,
    setResources: (updater) =>
      queryClient.setQueryData(["resources", user?.userId], updater),
    resourcesLoading,
    resourcesError,
    flattedResources,
    refetch,
  };
}

export default useGetAllResources;
