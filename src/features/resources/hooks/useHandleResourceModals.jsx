import { useState } from "react";

function useHandleResourcesModals(setSelectedResource) {
  const [isAddResourceModalOpen, setIsAddResourceModalOpen] = useState(false);
  const [isModifyResourceModalOpen, setIsModifyResourceModalOpen] =
    useState(false);
  const [isDeleteResourceModalOpen, setIsDeleteResourceModalOpen] =
    useState(false);

  const handleAddResourceModal = () => {
    setIsAddResourceModalOpen(!isAddResourceModalOpen);
  };

  const openModifyResourceModal = (plan) => {
    setSelectedResource(plan);
    setIsModifyResourceModalOpen(true);
  };

  const closeModifyResourceModal = () => {
    setSelectedResource(null);
    setIsModifyResourceModalOpen(false);
  };

  const openDeleteResourceModal = (planId) => {
    setSelectedResource(planId);
    setIsDeleteResourceModalOpen(true);
  };

  const closeDeleteResourceModal = () => {
    setSelectedResource(null);
    setIsDeleteResourceModalOpen(false);
  };

  return {
    isAddResourceModalOpen,
    isModifyResourceModalOpen,
    isDeleteResourceModalOpen,
    handleAddResourceModal,
    openModifyResourceModal,
    closeModifyResourceModal,
    openDeleteResourceModal,
    closeDeleteResourceModal,
  };
}

export default useHandleResourcesModals;
