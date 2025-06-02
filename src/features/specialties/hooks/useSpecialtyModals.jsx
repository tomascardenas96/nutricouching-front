import React, { useState } from "react";

function useSpecialtyModals(selectSpecialty) {
  const [isModifySpecialtyModalOpen, setIsModifySpecialtyModalOpen] =
    useState(false);
  const [isDeleteSpecialtyModalOpen, setIsDeleteSpecialtyModalOpen] =
    useState(false);

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
  };
}

export default useSpecialtyModals;
