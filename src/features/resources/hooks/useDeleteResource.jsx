import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";

function useDeleteResource(setResources, selectedResource, closeDeleteModal) {
  const handleDeleteResource = async () => {
    const deleteResource = async () => {
      const { data } = await apiClient.delete(`/resource/${selectedResource}`);

      return data;
    };

    toast.promise(deleteResource(), {
      loading: "Eliminando recurso...",
      error: (error) => {
        return "Error al eliminar el recurso";
      },
      success: (data) => {
        setResources((prev) => {
          return {
            freePlans: prev.freePlans.filter(
              (res) => res.resourceId !== data.id
            ),
            notPurchasedPlans: prev.notPurchasedPlans.filter(
              (res) => res.resourceId !== data.id
            ),
          };
        });
        closeDeleteModal();
        return "Recurso eliminado exitosamente!";
      },
    });
  };

  return { handleDeleteResource };
}

export default useDeleteResource;
