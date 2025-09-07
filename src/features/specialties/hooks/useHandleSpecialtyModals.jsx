import { useState } from "react";

function useHandleSpecialtyModals() {
  const [isAddSpecialtyModalOpen, setIsAddSpecialtyModalOpen] = useState(false);

  const handleOpenAddSpecialtyModal = () => {
    setIsAddSpecialtyModalOpen(true);
  };

  const handleCloseAddSpecialtyModal = () => {
    setIsAddSpecialtyModalOpen(false);
  };

  return { isAddSpecialtyModalOpen, handleOpenAddSpecialtyModal, handleCloseAddSpecialtyModal };
}

export default useHandleSpecialtyModals;
