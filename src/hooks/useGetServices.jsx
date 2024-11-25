import React, { useEffect, useState } from "react";
import { HOST } from "../api/data";

function useGetServices() {
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [servicesError, setServicesError] = useState(false);
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  const [isModifyServiceModalOpen, setIsModifyServiceModalOpen] =
    useState(false);

  useEffect(() => {
    const getAllServices = async () => {
      setServicesLoading(true);
      try {
        const response = await fetch(`${HOST}/service`);
        const data = await response.json();

        if (data.error) {
          throw new Error(data.message);
        }

        setServices(data);
      } catch (error) {
        console.error(error);
        setServicesError(true);
      } finally {
        setServicesLoading(true);
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
    setServices
  };
}

export default useGetServices;
