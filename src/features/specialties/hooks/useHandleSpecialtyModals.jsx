import { useState } from "react";

function useHandleSpecialtyModals(setSelectedSpecialty) {
  const [isAddSpecialtyModalOpen, setIsAddSpecialtyModalOpen] = useState(false);
  const [isDeleteSpecialtyModalOpen, setIsDeleteSpecialtyModalOpen] =
    useState(false);

  const handleOpenAddSpecialtyModal = () => {
    setIsAddSpecialtyModalOpen(true);
  };

  const handleCloseAddSpecialtyModal = () => {
    setIsAddSpecialtyModalOpen(false);
  };

  const handleOpenDeleteSpecialtyModal = (specialtyId) => {
    setSelectedSpecialty(specialtyId);
    setIsDeleteSpecialtyModalOpen(true);
  };

  const handleCloseDeleteSpecialtyModal = () => {
    setSelectedSpecialty(null);
    setIsDeleteSpecialtyModalOpen(false);
  };

  return {
    isAddSpecialtyModalOpen,
    isDeleteSpecialtyModalOpen,
    handleOpenAddSpecialtyModal,
    handleCloseAddSpecialtyModal,
    handleOpenDeleteSpecialtyModal,
    handleCloseDeleteSpecialtyModal,
  };
}

export default useHandleSpecialtyModals;
