import { createPortal } from "react-dom";
import useGetAllViands from "../../../hooks/useGetAllViands";
import useSelectViand from "../../../hooks/useSelectViand";
import useViandModals from "../../../hooks/useViandModals";
import ModifyViandModal from "./modals/ModifyViandModal";
import ViandsListDashboard from "./ViandsListDashboard";
import useDeleteViand from "../../../hooks/useDeleteViand";
import ConfirmationModal from "../../../../../common/components/ConfirmationModal";
import "./ViandsRootDashboard.css";
import AddViandModal from "./modals/AddViandModal";
import DashboardListSkeleton from "../../../../../common/components/dashboard/loader/DashboardListSkeleton";

function ViandsRootDashboard() {
  const { viands, setViands, viandsLoading, viandsError } = useGetAllViands();
  const { selectedViand, selectViand } = useSelectViand();
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

  return (
    <>
      <div className="viands-dashboard-container">
        {viandsError ? (
          <p className="error">Ha ocurrido un error</p>
        ) : viandsLoading ? (
          <DashboardListSkeleton />
        ) : viands?.length > 0 ? (
          <>
            <table className="viands-root-dashboard_table">
              <thead>
                <tr>
                  <th className="image-column"></th>
                  <th>Descripcion</th>
                  <th className="stock-column">Stock</th>
                  <th className="price-column">Precio</th>
                  <th className="options-column">Opciones</th>
                </tr>
              </thead>

              <tbody>
                <ViandsListDashboard
                  viands={viands}
                  openEditViandModal={openEditViandModal}
                  openDeleteViandModal={openDeleteViandModal}
                />
              </tbody>
            </table>
          </>
        ) : (
          <p className="no-viands">No hay viandas aún</p>
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
          document.getElementById("root")
        )}

      {isAddViandModalOpen &&
        createPortal(
          <AddViandModal
            handleAddViandModal={handleAddViandModal}
            setViands={setViands}
          />,
          document.getElementById("root")
        )}

      {isDeleteViandModalOpen &&
        createPortal(
          <ConfirmationModal
            onConfirm={handleDeleteViand}
            onClose={closeDeleteViandModal}
            message="¿Desea eliminar la vianda?"
          />,
          document.getElementById("root")
        )}
    </>
  );
}

export default ViandsRootDashboard;
