import { createPortal } from "react-dom";
import DashboardListSkeleton from "../../../../../../common/components/dashboard/loader/DashboardListSkeleton";
import { useSelectMenuOption } from "../../../../../dashboard/hooks/useSelectMenuOption";
import useGetAllViands from "../../../../hooks/useGetAllViands";
import useSelectViand from "../../../../hooks/useSelectViand";
import useViandModals from "../../../../hooks/useViandModals";
import AddViandModal from "../modals/AddViandModal";
import ModifyViandModal from "../modals/ModifyViandModal";
import ViandsCardDashboardMobile from "./ViandsCardDashboardMobile";
import "./ViandsRootDashboardMobile.css";

function ViandsRootDashboardMobile() {
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

  const filtered = searchTerm
    ? viands.filter((v) => v.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    : viands;

  return (
    <>
      <div className="viands-root-dashboard_mobile-container">
        <div className="viands-root-dashboard-mobile">
          {viandsError ? (
            <p className="error">Ha ocurrido un error</p>
          ) : viandsLoading ? (
            <DashboardListSkeleton />
          ) : filtered.length > 0 ? (
            <div className="split-viands-card">
              {filtered.map((viand) => (
                <ViandsCardDashboardMobile
                  key={`viand-${viand.viandId}`}
                  viand={viand}
                  setViands={setViands}
                  handleModifyViandModalOpen={openEditViandModal}
                />
              ))}
            </div>
          ) : (
            <p className="no-viands">
              {searchTerm ? "Sin resultados para la búsqueda" : "No hay viandas aún"}
            </p>
          )}
        </div>

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
            handleModifyViandModalClose={closeEditViandModal}
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
    </>
  );
}

export default ViandsRootDashboardMobile;
