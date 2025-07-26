import { useState } from "react";

function useHandlePlanModals() {
  const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState(false);
  const [isModifyPlanModalOpen, setIsModifyPlanModalOpen] = useState(false);
  const [isDeletePlanModalOpen, setIsDeletePlanModalOpen] = useState(false);

  const handleAddPlanModal = () => {
    setIsAddPlanModalOpen(!isAddPlanModalOpen);
  };

  const openModifyPlanModal = () => {};

  const closeModifyPlanModal = () => {};

  const openDeletePlanModal = () => {};

  const closeDeletePlanModal = () => {};

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
