import { toast } from "sonner";
import { HOST } from "../../../api/data";

function useDeleteResource(setResources, selectedResource, closeDeleteModal) {
  const handleDeleteResource = async () => {
    const token = localStorage.getItem("authToken");

    const deleteResource = async () => {
      const response = await fetch(`${HOST}/resource/${selectedResource}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error();
      }

      return await response.json();
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
