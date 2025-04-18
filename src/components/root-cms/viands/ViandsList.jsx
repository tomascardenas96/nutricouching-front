import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { LiaAddressCard } from "react-icons/lia";
import useDeleteViand from "../../../hooks/useDeleteViand";
import useGetAllViands from "../../../hooks/useGetAllViands";
import ConfirmationModal from "../../Common/ConfirmationModal";
import ViandCmsCard from "./ViandCmsCard";
import "./ViandsList.css";
import AddViandModal from "./modals/AddViandModal";
import ModifyViandModal from "./modals/ModifyViandModal";

function ViandsList() {
  const [selectedViand, setSelectedViand] = useState(null);
  const {
    viands,
    viandsLoading,
    viandsError,
    isAddViandModalOpen,
    isModifyViandModalOpen,
    handleAddViandModal,
    handleModifyViandModal,
    setViands,
  } = useGetAllViands();

  const {
    closeDeleteViandModal,
    handleDeleteViand,
    isDeleteViandModalOpen,
    openDeleteViandModal,
  } = useDeleteViand(setViands);

  return (
    <div className="cms-viand-list">
      <div className="cms-viand_filter">
        <form>
          <input type="text" placeholder="Buscar" />
          <CiSearch className="viands_search-filter_icon" />
        </form>
      </div>
      <div className="cms-viand_body">
        <table>
          <thead>
            <tr className="header_table">
              <th className="header_table-name">Nombre</th>
              <th className="header_table-price">Precio</th>
              <th className="header_table-options">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {viands?.map((viand) => (
              <tr key={`viand-${viand.viandId}`}>
                <ViandCmsCard
                  viand={viand}
                  handleModifyViandModal={handleModifyViandModal}
                  setSelectedViand={setSelectedViand}
                  openDeleteViandModal={openDeleteViandModal}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div onClick={handleAddViandModal} className="cms-viand-add">
        <LiaAddressCard className="add-viand_icon" />
        <h1>CREAR NUEVA VIANDA</h1>
      </div>

      {isAddViandModalOpen && (
        <AddViandModal
          handleAddViandModal={handleAddViandModal}
          setViands={setViands}
        />
      )}

      {isModifyViandModalOpen && (
        <ModifyViandModal
          handleModifyViandModal={handleModifyViandModal}
          selectedViand={selectedViand}
          setViands={setViands}
        />
      )}

      {isDeleteViandModalOpen && (
        <ConfirmationModal
          isOpen={isDeleteViandModalOpen}
          onClose={closeDeleteViandModal}
          onConfirm={handleDeleteViand}
          message="¿Seguro que desea eliminar la vianda?"
        />
      )}
    </div>
  );
}

export default ViandsList;
