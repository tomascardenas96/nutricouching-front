import { toast } from "sonner";
import { HOST } from "../api/data";
import { useState } from "react";

function useDeleteService(setServices) {
  const [isDeleteServiceModalOpen, setIsDeleteServiceModalOpen] =
    useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const openModal = (serviceId) => {
    setSelectedServiceId(serviceId);
    setIsDeleteServiceModalOpen(true);
  };

  const closeModal = () => {
    setSelectedServiceId(null);
    setIsDeleteServiceModalOpen(false);
  };

  const handleDeleteService = () => {
    const deleteService = async () => {
      const response = await fetch(
        `${HOST}/service/delete/${selectedServiceId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    };

    toast.promise(deleteService(), {
      success: () => {
        setServices((prev) =>
          prev.filter((service) => service.serviceId !== selectedServiceId)
        );
        setIsDeleteServiceModalOpen(false);
        return "Servicio eliminado correctamente";
      },
      loading: "Cargando...",
      error: "Error al borrar un servicio",
    });
  };

  return {
    handleDeleteService,
    isDeleteServiceModalOpen,
    openModal,
    closeModal,
  };
}

export default useDeleteService;
