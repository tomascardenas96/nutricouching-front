import { useState } from "react";

function useProfessionalModals(handleSelectProfessional) {
  const [isModifyProfessionalModalOpen, setIsModifyProfessionalModalOpen] =
    useState(false);
  const [isDeleteProfessionalModalOpen, setIsDeleteProfessionalModalOpen] =
    useState(false);

  const handleOpenModifyModal = (professional) => {
    handleSelectProfessional(professional);
    setIsModifyProfessionalModalOpen(true);
  };

  const handleCloseModifyModal = () => {
    setIsModifyProfessionalModalOpen(false);
  };

  const handleOpenDeleteModal = (professional) => {
    handleSelectProfessional(professional);
    setIsDeleteProfessionalModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteProfessionalModalOpen(false);
  };

  return {
    isModifyProfessionalModalOpen,
    isDeleteProfessionalModalOpen,
    handleOpenModifyModal,
    handleCloseModifyModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  };
}

export default useProfessionalModals;
