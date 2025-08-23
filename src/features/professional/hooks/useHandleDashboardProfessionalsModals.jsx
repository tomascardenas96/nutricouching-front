import { useState } from "react";

function useHandleDashboardProfessionalsModals(setSelectedProfessional) {
  const [isAddProfessionalModalOpen, setIsAddProfessionalModalOpen] =
    useState(false);
  const [isModifyProfessionalModalOpen, setIsModifyProfessionalModalOpen] =
    useState(false);
  const [isDeleteProfessionalModalOpen, setIsDeleteProfessionalModalOpen] =
    useState(false);

  const handleAddProfessionalModal = () => {
    setIsAddProfessionalModalOpen(!isAddProfessionalModalOpen);
  };

  const handleModifyProfessionalModalOpen = (product) => {
    setSelectedProfessional(product);
    setIsModifyProfessionalModalOpen(true);
  };

  const handleModifyProfessionalModalClose = () => {
    setSelectedProfessional(null);
    setIsModifyProfessionalModalOpen(false);
  };

  const handleDeleteProfessionalModalOpen = (professional) => {
    setSelectedProfessional(professional);
    setIsDeleteProfessionalModalOpen(true);
  };

  const handleDeleteProfessionalModalClose = () => {
    setIsDeleteProfessionalModalOpen(false);
  };

  return {
    handleAddProfessionalModal,
    handleModifyProfessionalModalOpen,
    handleModifyProfessionalModalClose,
    isAddProfessionalModalOpen,
    isModifyProfessionalModalOpen,
    handleDeleteProfessionalModalOpen,
    handleDeleteProfessionalModalClose,
    isDeleteProfessionalModalOpen
  };
}

export default useHandleDashboardProfessionalsModals;
