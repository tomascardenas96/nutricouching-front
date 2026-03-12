import { useEffect, useState } from "react";
import apiClient from "../../auth/api/apiClient";

function useGetAllViands() {
  const [viands, setViands] = useState([]);
  const [viandsLoading, setViandsLoading] = useState(true);
  const [viandsError, setViandsError] = useState(false);
  const [isAddViandModalOpen, setIsAddViandModalOpen] = useState(null);
  const [isModifyViandModalOpen, setIsModifyViandModalOpen] = useState(null);

  useEffect(() => {
    const getAllViands = async () => {
      try {
        const { data } = await apiClient.get("/viand");
        setViands(data);
      } catch (error) {
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
    setViands,
  };
}

export default useGetAllViands;
