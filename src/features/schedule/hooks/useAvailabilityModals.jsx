import { useState } from "react";

function useAvailabilityModals(setSelectedAvailability) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleOpenModifyModal = (selectedAvailability) => {
    setSelectedAvailability(selectedAvailability);
    setIsModifyModalOpen(true);
  };

  const handleCloseModifyModal = () => {
    setSelectedAvailability(null);
    setIsModifyModalOpen(false);
  };

  const handleOpenDeleteModal = (selectedAvailability) => {
    setSelectedAvailability(selectedAvailability);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedAvailability(null);
    setIsDeleteModalOpen(false);
  };

  return {
    isAddModalOpen,
    isModifyModalOpen,
    isDeleteModalOpen,
    handleOpenAddModal,
    handleCloseAddModal,
    handleOpenModifyModal,
    handleCloseModifyModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  };
}

export default useAvailabilityModals;
