import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CiSearch } from "react-icons/ci";
import { LiaAddressCard } from "react-icons/lia";
import useGetProfessionals from "../../../hooks/useGetProfessionals";
import ProfessionalCmsCard from "./ProfessionalCmsCard";
import "./ProfessionalList.css";
import ManageProfessionalModal from "./modals/ManageProfessionalModal";

function ProfessionalsList() {
  const {
    professionals,
    professionalsError,
    professionalsLoading,
    setProfessionals,
  } = useGetProfessionals();

  const [isManageProfessionalsModalOpen, setIsManageProfessionalsModalOpen] =
    useState(false);

  const handleManageProfessionalsModal = () => {
    setIsManageProfessionalsModalOpen((prev) => !prev);
  };

  // Cuando el componente se monte, se eliminara
  useEffect(() => {
    localStorage.removeItem("new-specialties");
  }, [isManageProfessionalsModalOpen]);

  return (
    <div className="cms-professional-list">
      <div className="cms-professional_filter">
        <form>
          <input type="text" placeholder="Buscar" />
          <CiSearch className="professionals_search-filter_icon" />
        </form>
      </div>
      <div className="cms-professional_body">
        <table>
          <thead>
            <tr className="header_table">
              <th className="header_table-name">Nombre</th>
              <th className="header_table-options">Profesion</th>
            </tr>
          </thead>
          <tbody>
            {professionals?.map((professional) => (
              <tr
                key={`professional-${professional.professionalId}`}
                className="cms-professional_tr-table"
              >
                <ProfessionalCmsCard professional={professional} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className="cms-professional-add"
        onClick={handleManageProfessionalsModal}
      >
        <LiaAddressCard className="add-professional_icon" />
        <h1>GESTIONAR PROFESIONALES</h1>
      </div>

      {isManageProfessionalsModalOpen &&
        createPortal(
          <ManageProfessionalModal
            handleManageProfessionalsModal={handleManageProfessionalsModal}
            professionals={professionals}
            professionalsError={professionalsError}
            professionalsLoading={professionalsLoading}
            setProfessionals={setProfessionals}
          />,
          document.body
        )}
    </div>
  );
}

export default ProfessionalsList;
