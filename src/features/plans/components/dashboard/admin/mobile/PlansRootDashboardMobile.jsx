import { useState } from "react";
import { createPortal } from "react-dom";
import useGetAllPlans from "../../../../hooks/useGetAllPlans";
import useHandlePlanModals from "../../../../hooks/useHandlePlanModals";
import NewPlanModal from "../modals/NewPlanModal";
import UpdatePlanModal from "../modals/UpdatePlanModal";
import PlansCardDashboardMobile from "./PlansCardDashboardMobile";
import "./PlansRootDashboardMobile.css";

function PlansRootDashboardMobile() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const {
    isAddPlanModalOpen,
    isModifyPlanModalOpen,
    handleAddPlanModal,
    openModifyPlanModal,
    closeModifyPlanModal,
  } = useHandlePlanModals(setSelectedPlan);

  const { plans, setPlans, flattedPlans, plansError, plansLoading } =
    useGetAllPlans(setSelectedPlan, null);

  return (
    <>
      <div className="plans-root-dashboard_mobile-container">
        <div className="plans-root-dashboard-mobile">
          {flattedPlans?.length > 0 ? (
            <div className="split-plans-card">
              {flattedPlans.map((plan) => (
                <PlansCardDashboardMobile
                  key={`plan-${plan.planId}`}
                  plan={plan}
                  setPlans={setPlans}
                  openModifyPlanModal={openModifyPlanModal}
                  setSelectedPlan={setSelectedPlan}
                />
              ))}
            </div>
          ) : (
            <tr>
              <th
                colSpan={5}
                style={{ textAlign: "center" }}
                className="no-plans"
              >
                No hay planes aún.
              </th>
            </tr>
          )}
        </div>

        <div className="add-product_btn" onClick={handleAddPlanModal}>
          <button>Agregar plan</button>
        </div>
      </div>

      {isModifyPlanModalOpen &&
        createPortal(
          <UpdatePlanModal
            selectedPlan={selectedPlan}
            setPlans={setPlans}
            closeModifyPlanModal={closeModifyPlanModal}
          />,
          document.body
        )}

      {isAddPlanModalOpen &&
        createPortal(
          <NewPlanModal
            setPlans={setPlans}
            handleAddPlanModal={handleAddPlanModal}
          />,
          document.body
        )}
    </>
  );
}

export default PlansRootDashboardMobile;
