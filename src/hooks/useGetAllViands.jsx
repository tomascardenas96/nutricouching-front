import React, { useEffect, useState } from "react";
import { HOST } from "../api/data";

function useGetAllViands() {
  const [viands, setViands] = useState([]);
  const [viandsLoading, setViandsLoading] = useState(true);
  const [viandsError, setViandsError] = useState(false);
  const [isAddViandModalOpen, setIsAddViandModalOpen] = useState(null);
  const [isModifyViandModalOpen, setIsModifyViandModalOpen] = useState(null);

  useEffect(() => {
    const getAllViands = async () => {
      try {
        const response = await fetch(`${HOST}/viand`);

        if (!response.ok) {
          throw new Error("Error getting viands");
        }

        const data = await response.json();

        setViands(data);
      } catch (error) {
        console.error(error);
        setViandsError(true);
      } finally {
        setViandsLoading(false);
      }
    };

    getAllViands();
  }, []);

  const handleAddViandModal = () => {
    setIsAddViandModalOpen(!isAddViandModalOpen);
  };

  const handleModifyViandModal = () => {
    setIsModifyViandModalOpen(!isModifyViandModalOpen);
  };

  return {
    viands,
    viandsLoading,
    viandsError,
    isAddViandModalOpen,
    isModifyViandModalOpen,
    handleAddViandModal,
    handleModifyViandModal,
    setViands
  };
}

export default useGetAllViands;
