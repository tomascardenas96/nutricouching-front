import { useState } from "react";
import { createPortal } from "react-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { RiApps2AddLine } from "react-icons/ri";
import useGetAllSpecialtiesByProfessional from "../../../hooks/useGetAllSpecialtiesByProfessional";
import useUnlinkSpecialtyOfProfessional from "../../../hooks/useUnlinkSpecialtyOfProfessional";
import ConfirmationModal from "../../Common/ConfirmationModal";
import "./Specialties.css";
import AddSpecialtyModal from "./modal/AddSpecialtyModal";

function Specialties({ user }) {
  const [isAddSpecialtyModalOpen, setIsAddSpecialtyModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  const { specialties, specialtiesError, specialtiesLoading, setSpecialties } =
    useGetAllSpecialtiesByProfessional(user.professional.professionalId);

  const { handleUnlinkSpecialtyOfProfessional } =
    useUnlinkSpecialtyOfProfessional(setSpecialties);

  const handleOpenCloseModal = () => {
    setIsAddSpecialtyModalOpen(!isAddSpecialtyModalOpen);
  };

  const handleConfirmationDeleteModal = (specialty) => {
    if (!!specialty) {
      setSelectedSpecialty(specialty);
    }
    setIsConfirmationModalOpen(!isConfirmationModalOpen);
  };

  return (
    <div className="admin-specialties_container">
      {!!!specialties.length ? (
        <div className="no-specialties">
          <h1>No hay especialidades asociadas.</h1>
        </div>
      ) : (
        <>
          <table className="admin-specialties_table">
            <thead>
              <tr>
                <th className="name">Nombre</th>
                <th className="service">Servicio</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {specialties?.map((specialty) => (
                <tr key={`specialty-${specialty.specialtyId}`}>
                  <td>{specialty.name}</td>
                  <td className="title">{specialty.service.title}</td>
                  <td>
                    <FaRegTrashAlt
                      className="remove-icon"
                      onClick={() => handleConfirmationDeleteModal(specialty)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <div onClick={handleOpenCloseModal} className="admin-specialties_add">
        <h1>
          <RiApps2AddLine className="add-icon" /> AGREGAR ESPECIALIDAD
        </h1>
      </div>

      {isConfirmationModalOpen &&
        createPortal(
          <ConfirmationModal
            onClose={handleConfirmationDeleteModal}
            onConfirm={() => {
              handleConfirmationDeleteModal();
              handleUnlinkSpecialtyOfProfessional(
                selectedSpecialty.specialtyId,
                user.professional.professionalId
              );
            }}
            message="¿Desea eliminar esta especialidad?"
          />,
          document.body
        )}

      {isAddSpecialtyModalOpen &&
        createPortal(
          <AddSpecialtyModal
            handleOpenCloseModal={handleOpenCloseModal}
            user={user}
            setSpecialties={setSpecialties}
          />,
          document.body
        )}
    </div>
  );
}

export default Specialties;
