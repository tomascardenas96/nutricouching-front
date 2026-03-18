import { createPortal } from "react-dom";
import DashboardListSkeleton from "../../../../../common/components/dashboard/loader/DashboardListSkeleton";
import ConfirmationModal from "../../../../../common/components/ConfirmationModal";
import { useSelectMenuOption } from "../../../../dashboard/hooks/useSelectMenuOption";
import useGetAllViands from "../../../hooks/useGetAllViands";
import useSelectViand from "../../../hooks/useSelectViand";
import useViandModals from "../../../hooks/useViandModals";
import useDeleteViand from "../../../hooks/useDeleteViand";
import AddViandModal from "./modals/AddViandModal";
import ModifyViandModal from "./modals/ModifyViandModal";
import ViandsListDashboard from "./ViandsListDashboard";
import "./ViandsRootDashboard.css";

function ViandsRootDashboard() {
  const { viands, setViands, viandsLoading, viandsError } = useGetAllViands();
  const { selectedViand, selectViand } = useSelectViand();
  const { searchTerm } = useSelectMenuOption();
  const {
    openEditViandModal,
    closeEditViandModal,
    isEditViandModalOpen,
    handleAddViandModal,
    isAddViandModalOpen,
  } = useViandModals(selectViand);

  const {
    handleDeleteViand,
    openDeleteViandModal,
    isDeleteViandModalOpen,
    closeDeleteViandModal,
  } = useDeleteViand(setViands);

  const filtered = searchTerm
    ? viands.filter((v) => v.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    : viands;

  return (
    <>
      <div className="viands-dashboard-container">
        {viandsError ? (
          <p className="error">Ha ocurrido un error</p>
        ) : viandsLoading ? (
          <DashboardListSkeleton />
        ) : filtered.length > 0 ? (
          <table className="viands-root-dashboard_table">
            <thead>
              <tr>
                <th className="image-column"></th>
                <th>Descripción</th>
                <th className="stock-column">Stock</th>
                <th className="price-column">Precio</th>
                <th className="options-column">Opciones</th>
              </tr>
            </thead>
            <tbody>
              <ViandsListDashboard
                viands={filtered}
                openEditViandModal={openEditViandModal}
                openDeleteViandModal={openDeleteViandModal}
              />
            </tbody>
          </table>
        ) : (
          <p className="no-viands">
            {searchTerm ? "Sin resultados para la búsqueda" : "No hay viandas aún"}
          </p>
        )}

        {!viandsError && !viandsLoading && (
          <div className="add-viand_btn" onClick={handleAddViandModal}>
            <button>Agregar vianda</button>
          </div>
        )}
      </div>

      {isEditViandModalOpen &&
        createPortal(
          <ModifyViandModal
            selectedViand={selectedViand}
            setViands={setViands}
            handleModifyViandModal={closeEditViandModal}
          />,
          document.getElementById("root-portal")
        )}

      {isAddViandModalOpen &&
        createPortal(
          <AddViandModal
            handleAddViandModal={handleAddViandModal}
            setViands={setViands}
          />,
          document.getElementById("root-portal")
        )}

      {isDeleteViandModalOpen &&
        createPortal(
          <ConfirmationModal
            onConfirm={handleDeleteViand}
            onClose={closeDeleteViandModal}
            message="¿Desea eliminar la vianda?"
          />,
          document.getElementById("root-portal")
        )}
    </>
  );
}

export default ViandsRootDashboard;
