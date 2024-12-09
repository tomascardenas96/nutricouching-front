import { useState } from "react";
import "./SpecialtyDropdownModal.css";
import { createPortal } from "react-dom";
import AddNewSpecialtyModal from "./AddNewSpecialtyModal";
import useAddNewSpecialty from "../../../../../../hooks/useAddNewSpecialty";

function SpecialtyDropdownModal({
  specialties,
  specialtiesLoading,
  specialtiesError,
  handleSelectSpecialty,
  handleUnselectSpecialty,
  handleChangeCreateSpecialty,
  handleCloseAddSpecialtyModal,
  handleOpenAddSpecialtyModal,
  handleSubmitCreateSpecialty,
  isModalAddSpecialtyOpen,
  setSpecialties,
  setSelectedSpecialties,
}) {
  return (
    <div className="specialty-dropdown-menu">
      {specialties.map((specialty, idx) => (
        <div
          key={`specialty-${specialty.name}${idx}`}
          className="specialty-card"
          onClick={() => handleSelectSpecialty(specialty)}
        >
          <p>{specialty.name}</p>
        </div>
      ))}
      {!specialties.length && <p className="no-match">No hay coincidencias</p>}
      <p
        className="add-new-specialty-link"
        onClick={handleOpenAddSpecialtyModal}
      >
        + Agregar una nueva especialidad
      </p>

      
    </div>
  );
}

export default SpecialtyDropdownModal;
