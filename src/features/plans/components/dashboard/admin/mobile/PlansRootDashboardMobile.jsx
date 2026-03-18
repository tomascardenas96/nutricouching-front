import { useState } from "react";
import { createPortal } from "react-dom";
import DashboardListSkeleton from "../../../../../../common/components/dashboard/loader/DashboardListSkeleton";
import { useSelectMenuOption } from "../../../../../dashboard/hooks/useSelectMenuOption";
import useGetAllPlans from "../../../../hooks/useGetAllPlans";
import useHandlePlanModals from "../../../../hooks/useHandlePlanModals";
import NewPlanModal from "../modals/NewPlanModal";
import UpdatePlanModal from "../modals/UpdatePlanModal";
import PlansCardDashboardMobile from "./PlansCardDashboardMobile";
import "./PlansRootDashboardMobile.css";

function PlansRootDashboardMobile() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { setPlans, flattedPlans, plansError, plansLoading } = useGetAllPlans();
  const { searchTerm } = useSelectMenuOption();

  const {
    isAddPlanModalOpen,
    isModifyPlanModalOpen,
    handleAddPlanModal,
    openModifyPlanModal,
    closeModifyPlanModal,
  } = useHandlePlanModals(setSelectedPlan);

  const filtered = searchTerm
    ? flattedPlans.filter((p) => p.title?.toLowerCase().includes(searchTerm.toLowerCase()))
    : flattedPlans;

  return (
    <>
      <div className="plans-root-dashboard_mobile-container">
        <div className="plans-root-dashboard-mobile">
          {plansError ? (
            <p className="error">Ha ocurrido un error</p>
          ) : plansLoading ? (
            <DashboardListSkeleton />
          ) : filtered.length > 0 ? (
            <div className="split-plans-card">
              {filtered.map((plan) => (
                <PlansCardDashboardMobile
                  key={`plan-${plan.planId}`}
                  plan={plan}
                  setPlans={setPlans}
                  openModifyPlanModal={openModifyPlanModal}
                />
              ))}
            </div>
          ) : (
            <p className="no-plans">
              {searchTerm ? "Sin resultados para la búsqueda" : "No hay planes aún"}
            </p>
          )}
        </div>

        {!plansError && !plansLoading && (
          <div className="add-plan_btn" onClick={handleAddPlanModal}>
            <button>Agregar plan</button>
          </div>
        )}
      </div>

      {isModifyPlanModalOpen &&
        createPortal(
          <UpdatePlanModal
            selectedPlan={selectedPlan}
            setPlans={setPlans}
            closeModifyPlanModal={closeModifyPlanModal}
          />,
          document.getElementById("root-portal")
        )}

      {isAddPlanModalOpen &&
        createPortal(
          <NewPlanModal setPlans={setPlans} handleAddPlanModal={handleAddPlanModal} />,
          document.getElementById("root-portal")
        )}
    </>
  );
}

export default PlansRootDashboardMobile;
