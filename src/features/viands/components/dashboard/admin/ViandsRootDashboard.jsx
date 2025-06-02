import { createPortal } from "react-dom";
import useGetAllViands from "../../../hooks/useGetAllViands";
import useSelectViand from "../../../hooks/useSelectViand";
import useViandModals from "../../../hooks/useViandModals";
import ModifyViandModal from "./modals/ModifyViandModal";
import ViandsListDashboard from "./ViandsListDashboard";
import useDeleteViand from "../../../hooks/useDeleteViand";
import ConfirmationModal from "../../../../../common/components/ConfirmationModal";
import "./ViandsRootDashboard.css";

function ViandsRootDashboard() {
  const { viands, setViands } = useGetAllViands();
  const { selectedViand, selectViand } = useSelectViand();
  const { openEditViandModal, closeEditViandModal, isEditViandModalOpen } =
    useViandModals(selectViand);

  const {
    handleDeleteViand,
    openDeleteViandModal,
    isDeleteViandModalOpen,
    closeDeleteViandModal,
  } = useDeleteViand(setViands);

  return (
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

      {isEditViandModalOpen &&
        createPortal(
          <ModifyViandModal
            selectedViand={selectedViand}
            setViands={setViands}
            handleModifyViandModal={closeEditViandModal}
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
