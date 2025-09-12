import { createPortal } from "react-dom";
import useGetAllViands from "../../../../hooks/useGetAllViands";
import useSelectViand from "../../../../hooks/useSelectViand";
import useViandModals from "../../../../hooks/useViandModals";
import AddViandModal from "../modals/AddViandModal";
import ModifyViandModal from "../modals/ModifyViandModal";
import ViandsCardDashboardMobile from "./ViandsCardDashboardMobile";
import "./ViandsRootDashboardMobile.css";
import DashboardListSkeleton from "../../../../../../common/components/dashboard/loader/DashboardListSkeleton";

function ViandsRootDashboardMobile() {
  const { viands, setViands, viandsLoading, viandsError } = useGetAllViands();
  const { selectedViand, selectViand } = useSelectViand();

  const {
    openEditViandModal,
    closeEditViandModal,
    isEditViandModalOpen,
    handleAddViandModal,
    isAddViandModalOpen,
  } = useViandModals(selectViand);

  return (
    <>
      <div className="viands-root-dashboard_mobile-container">
        <div className="viands-root-dashboard-mobile">
          {viandsError ? (
            <p className="error">Ha ocurrido un error</p>
          ) : viandsLoading ? (
            <DashboardListSkeleton />
          ) : viands?.length > 0 ? (
            <div className="split-viands-card">
              {viands.map((viand) => (
                <ViandsCardDashboardMobile
                  hey={`viand-${viand.viandId}`}
                  viand={viand}
                  setViands={setViands}
                  handleModifyViandModalOpen={openEditViandModal}
                />
              ))}
            </div>
          ) : (
            <p className="no-viands">No hay viandas aún</p>
          )}
        </div>

        {!viandsError && !viandsLoading && (
          <div className="add-product_btn" onClick={handleAddViandModal}>
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
          document.body
        )}

      {isAddViandModalOpen &&
        createPortal(
          <AddViandModal
            handleAddViandModal={handleAddViandModal}
            setViands={setViands}
          />,
          document.body
        )}
    </>
  );
}

export default ViandsRootDashboardMobile;
