import { useState } from "react";

function useSpecialtyModals(selectSpecialty) {
  const [isAddSpecialtyModalOpen, setIsAddSpecialtyModalOpen] = useState(false);
  const [isModifySpecialtyModalOpen, setIsModifySpecialtyModalOpen] =
    useState(false);
  const [isDeleteSpecialtyModalOpen, setIsDeleteSpecialtyModalOpen] =
    useState(false);

  const handleAddSpecialtyModal = () => {
    setIsAddSpecialtyModalOpen(!isAddSpecialtyModalOpen);
  };

  const handleOpenModifyModal = (specialty) => {
    selectSpecialty(specialty);
    setIsModifySpecialtyModalOpen(true);
  };

  const handleCloseModifyModal = () => {
    setIsModifySpecialtyModalOpen(false);
  };

  const handleOpenDeleteModal = (specialty) => {
    selectSpecialty(specialty);
    setIsDeleteSpecialtyModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteSpecialtyModalOpen(false);
  };

  return {
    handleOpenModifyModal,
    handleCloseModifyModal,
    isModifySpecialtyModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    isDeleteSpecialtyModalOpen,
    handleAddSpecialtyModal,
    isAddSpecialtyModalOpen,
  };
}

export default useSpecialtyModals;
