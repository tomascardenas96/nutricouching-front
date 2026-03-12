import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";
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
      const { data } = await apiClient.delete(`/service/delete/${selectedServiceId}`);
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
