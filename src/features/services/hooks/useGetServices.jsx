import React, { useEffect, useState } from "react";
import apiClient from "../../auth/api/apiClient";

function useGetServices() {
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState(false);
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  const [isModifyServiceModalOpen, setIsModifyServiceModalOpen] =
    useState(false);

  useEffect(() => {
    const getAllServices = async () => {
      try {
        const { data } = await apiClient.get("/service");
        setServices(data);
      } catch (error) {
        console.error(error);
        setServicesError(true);
      } finally {
        setServicesLoading(false);
      }
    };

    getAllServices();
  }, []);

  const handleAddServiceModal = () => {
    setIsAddServiceModalOpen(!isAddServiceModalOpen);
  };

  const handleModifyServiceModal = () => {
    setIsModifyServiceModalOpen(!isModifyServiceModalOpen);
  };

  return {
    services,
    servicesLoading,
    servicesError,
    handleAddServiceModal,
    handleModifyServiceModal,
    isAddServiceModalOpen,
    isModifyServiceModalOpen,
    setServices,
  };
}

export default useGetServices;
