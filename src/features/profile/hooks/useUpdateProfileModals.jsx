import React, { useState } from "react";

function useUpdateProfileModals() {
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [isUpdateProfileModalOpen, setIsUpdateProfileModalOpen] =
    useState(false);

  const handleOpenOptionsModal = () => {
    setIsOptionsModalOpen(!isOptionsModalOpen);
  };

  const handleCloseOptionsModal = () => {
    setIsOptionsModalOpen(!isOptionsModalOpen);
  };

  const handleOpenUpdateProfileModal = () => {
    setIsUpdateProfileModalOpen(true);
  };

  const handleCloseUpdateProfileModal = () => {
    setIsUpdateProfileModalOpen(false);
  };
  return {
    handleOpenOptionsModal,
    handleCloseOptionsModal,
    handleOpenUpdateProfileModal,
    handleCloseUpdateProfileModal,
    isOptionsModalOpen,
    isUpdateProfileModalOpen,
  };
}

export default useUpdateProfileModals;
