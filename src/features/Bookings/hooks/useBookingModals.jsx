import { useState } from "react";

function useBookingModals(setSelectedBookingId) {
  const [isDeleteBookingModalOpen, setIsDeleteBookingModalOpen] =
    useState(false);

  const handleOpenDeleteBookingModal = (bookingId) => {
    setSelectedBookingId(bookingId);
    setIsDeleteBookingModalOpen(true);
  };

  const handleCloseDeleteBookingModal = () => {
    setSelectedBookingId(null);
    setIsDeleteBookingModalOpen(false);
  };

  return {
    isDeleteBookingModalOpen,
    handleOpenDeleteBookingModal,
    handleCloseDeleteBookingModal,
  };
}

export default useBookingModals;
