import { useState } from "react";

function useHandlePlanModals(setSelectedPlan) {
  const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState(false);
  const [isModifyPlanModalOpen, setIsModifyPlanModalOpen] = useState(false);
  const [isDeletePlanModalOpen, setIsDeletePlanModalOpen] = useState(false);

  const handleAddPlanModal = () => {
    setIsAddPlanModalOpen(!isAddPlanModalOpen);
  };

  const openModifyPlanModal = (plan) => {
    setSelectedPlan(plan);
    setIsModifyPlanModalOpen(true);
  };

  const closeModifyPlanModal = () => {
    setSelectedPlan(null);
    setIsModifyPlanModalOpen(false);
  };

  const openDeletePlanModal = (planId) => {
    setSelectedPlan(planId);
    setIsDeletePlanModalOpen(true);
  };

  const closeDeletePlanModal = () => {
    setSelectedPlan(null);
    setIsDeletePlanModalOpen(false);
  };

  return {
    isAddPlanModalOpen,
    isModifyPlanModalOpen,
    isDeletePlanModalOpen,
    handleAddPlanModal,
    openModifyPlanModal,
    closeModifyPlanModal,
    openDeletePlanModal,
    closeDeletePlanModal,
  };
}

export default useHandlePlanModals;
