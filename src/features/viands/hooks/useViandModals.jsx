import { useState } from "react";

function useViandModals(selectViand) {
  const [isEditViandModalOpen, setIsEditViandModalOpen] = useState(false);

  const openEditViandModal = (viand) => {
    selectViand(viand);
    setIsEditViandModalOpen(true);
  };

  const closeEditViandModal = () => {
    setIsEditViandModalOpen(false);
  };

  return { openEditViandModal, closeEditViandModal, isEditViandModalOpen };
}

export default useViandModals;
