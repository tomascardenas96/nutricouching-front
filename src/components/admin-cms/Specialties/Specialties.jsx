import useGetAllSpecialtiesByProfessional from "../../../hooks/useGetAllSpecialtiesByProfessional";
import { FaRegTrashAlt } from "react-icons/fa";
import "./Specialties.css";
import { useState } from "react";
import { createPortal } from "react-dom";
import AddSpecialtyModal from "./modal/AddSpecialtyModal";

function Specialties({ user }) {
  const [isAddSpecialtyModalOpen, setIsAddSpecialtyModalOpen] = useState(false);
  const { specialties, specialtiesError, specialtiesLoading, setSpecialties } =
    useGetAllSpecialtiesByProfessional(user.professional.professionalId);

  const handleOpenCloseModal = () => {
    setIsAddSpecialtyModalOpen(!isAddSpecialtyModalOpen);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Servicio</th>
            <th>Eliminar</th>
          </tr>
        </thead>

        <tbody>
          {specialties?.map((specialty) => (
            <tr key={`specialty-${specialty.specialtyId}`}>
              <td>{specialty.name}</td>
              <td>{specialty.service.title}</td>
              <td>
                <FaRegTrashAlt />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div onClick={handleOpenCloseModal}>
        <h1>Agregar Especialidad</h1>
      </div>

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
