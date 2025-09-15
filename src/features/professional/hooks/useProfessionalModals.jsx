import { useState } from "react";

function useProfessionalModals(setSelectedProfessional) {
  const [isAddProfessionalModalOpen, setIsAddProfessionalModalOpen] =
    useState(false);
  const [isModifyProfessionalModalOpen, setIsModifyProfessionalModalOpen] =
    useState(false);
  const [isDeleteProfessionalModalOpen, setIsDeleteProfessionalModalOpen] =
    useState(false);

  const handleAddProfessionalModal = () => {
    setIsAddProfessionalModalOpen(!isAddProfessionalModalOpen);
  };

  const handleOpenModifyModal = (professional) => {
    setSelectedProfessional(professional);
    setIsModifyProfessionalModalOpen(true);
  };

  const handleCloseModifyModal = () => {
    setSelectedProfessional(null);
    setIsModifyProfessionalModalOpen(false);
  };

  const handleOpenDeleteModal = (professional) => {
    setSelectedProfessional(professional);
    setIsDeleteProfessionalModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedProfessional(null);
    setIsDeleteProfessionalModalOpen(false);
  };

  return {
    isModifyProfessionalModalOpen,
    isDeleteProfessionalModalOpen,
    handleOpenModifyModal,
    handleCloseModifyModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    isAddProfessionalModalOpen,
    handleAddProfessionalModal,
  };
}

export default useProfessionalModals;
