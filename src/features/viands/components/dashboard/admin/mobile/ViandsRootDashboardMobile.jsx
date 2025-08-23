import { createPortal } from "react-dom";
import useGetAllViands from "../../../../hooks/useGetAllViands";
import useSelectViand from "../../../../hooks/useSelectViand";
import useViandModals from "../../../../hooks/useViandModals";
import AddViandModal from "../modals/AddViandModal";
import ModifyViandModal from "../modals/ModifyViandModal";
import ViandsCardDashboardMobile from "./ViandsCardDashboardMobile";
import "./ViandsRootDashboardMobile.css";

function ViandsRootDashboardMobile() {
  const { viands, setViands } = useGetAllViands();
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
          {viands?.length > 0 ? (
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
            <tr>
              <th
                colSpan={5}
                style={{ textAlign: "center" }}
                className="no-viands"
              >
                No hay viandas aún.
              </th>
            </tr>
          )}
        </div>

        <div className="add-product_btn" onClick={handleAddViandModal}>
          <button>Agregar vianda</button>
        </div>
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
