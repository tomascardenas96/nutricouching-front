import { CiSearch } from "react-icons/ci";
import { LiaAddressCard } from "react-icons/lia";
import useGetAllSpecialties from "../../../hooks/useGetAllSpecialties";
import SpecialtyCard from "./SpecialtiesCard";
import "./SpecialtiesList.css";
import { useState } from "react";
import { createPortal } from "react-dom";
import CreateSpecialtiesModal from "./modals/CreateSpecialtyModal";
import CreateSpecialtyModal from "./modals/CreateSpecialtyModal";

function SpecialtiesList() {
  const [isAddSpecialtiesModalOpen, setIsAddSpecialtiesModalOpen] =
    useState(false);

  const { specialties, loadingSpecialties, errorSpecialties, setSpecialties } =
    useGetAllSpecialties();

  const openModal = () => {
    setIsAddSpecialtiesModalOpen(true);
  };

  const closeModal = () => {
    setIsAddSpecialtiesModalOpen(false);
  };

  return (
    <section className="specialties-list_container">
      <div className="cms-specialties_filter">
        <form>
          <input type="text" placeholder="Buscar" />
          <CiSearch className="search-filter_icon" />
        </form>
      </div>

      <div className="cms-specialties_body">
        <table>
          <thead>
            <tr className="header_table">
              <th className="header_table-name">Nombre</th>
              <th className="header_table-services">Servicio</th>
              <th className="header_table-options">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {!specialties.length > 0 && (
              <p className="no-specialties">No hay especialidades</p>
            )}

            {specialties.length > 0 &&
              specialties?.map((specialty) => (
                <tr key={`specialty-${specialty.specialtyId}`}>
                  <SpecialtyCard specialty={specialty} />
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div onClick={openModal} className="cms-specialty-add">
        <LiaAddressCard className="add-specialty_icon" />
        <h1>CREAR NUEVA ESPECIALIDAD</h1>
      </div>

      {/* Modal */}
      {isAddSpecialtiesModalOpen &&
        createPortal(
          <CreateSpecialtyModal
            closeModal={closeModal}
            setSpecialties={setSpecialties}
          />,
          document.body
        )}
    </section>
  );
}

export default SpecialtiesList;
