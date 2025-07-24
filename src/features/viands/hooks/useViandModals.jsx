import { useState } from "react";

function useViandModals(selectViand) {
  const [isAddViandModalOpen, setIsAddViandModalOpen] = useState(false);
  const [isEditViandModalOpen, setIsEditViandModalOpen] = useState(false);

  const handleAddViandModal = () => {
    setIsAddViandModalOpen(!isAddViandModalOpen);
  };

  const openEditViandModal = (viand) => {
    selectViand(viand);
    setIsEditViandModalOpen(true);
  };

  const closeEditViandModal = () => {
    setIsEditViandModalOpen(false);
  };

  return {
    openEditViandModal,
    closeEditViandModal,
    isEditViandModalOpen,
    handleAddViandModal,
    isAddViandModalOpen,
  };
}

export default useViandModals;
