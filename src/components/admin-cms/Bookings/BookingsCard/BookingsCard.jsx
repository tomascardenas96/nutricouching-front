import { useState } from "react";
import useGetAllSpecialties from "../../../../hooks/useGetAllSpecialties";
import "./BookingsCard.css";
import ConfirmationModal from "../../../Common/ConfirmationModal";
import { createPortal } from "react-dom";

function BookingsCard({
  name,
  specialty,
  startTimetable,
  id,
  endTimetable,
  isConfirmationDeleteBookingOpen,
  handleOpenConfirmationDeleteBooking,
  setSelectedBookingId,
}) {
  const { errorSpecialties, loadingSpecialties, specialties } =
    useGetAllSpecialties();

  const getSpecialtyById = (specialtyId) => {
    const specialty = specialties?.find(
      (specialty) => specialty?.specialtyId === specialtyId
    );
    return specialty?.name;
  };

  const handleOpenConfirmationModal = () => {
    setSelectedBookingId(id);
    handleOpenConfirmationDeleteBooking();
  };

  return (
    <>
      <div className="bookings-card_container">
        <div className="left">
          <p>{name}</p>
          <p>{`${startTimetable}hs - ${endTimetable}hs`}</p>
        </div>

        <div className="right">
          <p>{getSpecialtyById(specialty)}</p>
          <button onClick={handleOpenConfirmationModal}>Cancelar Turno</button>
        </div>
      </div>
    </>
  );
}

export default BookingsCard;
