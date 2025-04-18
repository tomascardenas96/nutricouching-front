import { createPortal } from "react-dom";
import "./SchedulesCard.css";
import React, { useState } from "react";
import ConfirmationModal from "../../../Common/ConfirmationModal";

function SchedulesCard({
  from,
  to,
  interval,
  handleDeleteTimeSlot,
  day,
}) {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const handleConfirmationModal = () => {
    setIsConfirmationModalOpen(!isConfirmationModalOpen);
  };

  return (
    <div className="schedules-card_container">
      <div className="left">
        <p>Desde: {from}hs</p>
        <p>-{interval}min</p>
      </div>

      <div className="right">
        <p>Hasta: {to}hs</p>
        <button onClick={() => setIsConfirmationModalOpen(true)}>
          Eliminar Horario
        </button>
      </div>

      {isConfirmationModalOpen &&
        createPortal(
          <ConfirmationModal
            isOpen={isConfirmationModalOpen}
            onClose={handleConfirmationModal}
            onConfirm={() =>
              handleDeleteTimeSlot(from, day).then(handleConfirmationModal())
            }
            message="¿Estás seguro de eliminar este horario?"
          />,
          document.body
        )}
    </div>
  );
}

export default SchedulesCard;
