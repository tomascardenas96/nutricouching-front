import { createPortal } from "react-dom";
import { useState } from "react";
import SpecialtyDropdownNewProfessional from "./SpecialtyDropdownNewProfessional";
import "./SpecialtyProfessionalForm.css";
import { GrClose } from "react-icons/gr";
import AddSpecialtyNewProfessional from "./AddSpecialtyNewProfessional";

function SpecialtyProfessionalForm({
  handleChangeSpecialtiesUserInput,
  specialtiesUserInput,
  specialties,
  specialtiesLoading,
  specialtiesError,
  handleSelectSpecialty,
  handleUnselectSpecialty,
  selectedSpecialties,
  setSpecialties,
  handleChangeCreateSpecialty,
  handleCloseAddSpecialtyModal,
  handleOpenAddSpecialtyModal,
  handleSubmitCreateSpecialty,
  isModalAddSpecialtyOpen,
  setSelectedSpecialties,
}) {
  const [inputFocused, setInputFocused] = useState(false);

  return (
    <div className="specialty-professional-form_container">
      <p className="manage-professional-modal_section-title">
        Especialidades
        <span className="professionals-modal_required-field">*</span>
      </p>

      <div style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Selecciona una o mas especialidades"
          className="manage-professional-modal_section-input specialty-input"
          onChange={handleChangeSpecialtiesUserInput}
          value={specialtiesUserInput}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setTimeout(() => setInputFocused(false), 150)}
        />

        {(specialtiesUserInput || inputFocused) && (
          <SpecialtyDropdownNewProfessional
            specialties={specialties}
            specialtiesLoading={specialtiesLoading}
            specialtiesError={specialtiesError}
            handleSelectSpecialty={handleSelectSpecialty}
            handleUnselectSpecialty={handleUnselectSpecialty}
            setSpecialties={setSpecialties}
            handleChangeCreateSpecialty={handleChangeCreateSpecialty}
            handleCloseAddSpecialtyModal={handleCloseAddSpecialtyModal}
            handleOpenAddSpecialtyModal={handleOpenAddSpecialtyModal}
            handleSubmitCreateSpecialty={handleSubmitCreateSpecialty}
            isModalAddSpecialtyOpen={isModalAddSpecialtyOpen}
            setSelectedSpecialties={setSelectedSpecialties}
          />
        )}
      </div>

      {selectedSpecialties?.length ? (
        <ul className="selected-specialties_card">
          {selectedSpecialties.map((specialty, idx) => (
            <li key={`selected-specialty-${specialty.name}-${idx}`}>
              {specialty.name}
              <GrClose
                className="delete-selected-specialty"
                onClick={() => handleUnselectSpecialty(specialty)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="professional-modal_no-selected-data">
          No hay especialidades seleccionadas
        </p>
      )}

      {isModalAddSpecialtyOpen &&
        createPortal(
          <AddSpecialtyNewProfessional
            handleCloseAddSpecialtyModal={handleCloseAddSpecialtyModal}
            handleChangeCreateSpecialty={handleChangeCreateSpecialty}
            handleOpenAddSpecialtyModal={handleOpenAddSpecialtyModal}
            handleSubmitCreateSpecialty={handleSubmitCreateSpecialty}
            isModalAddSpecialtyOpen={isModalAddSpecialtyOpen}
            setSelectedSpecialties={setSelectedSpecialties}
          />,
          document.body
        )}

      <hr className="professional-modal_divider-line" />
    </div>
  );
}

export default SpecialtyProfessionalForm;
