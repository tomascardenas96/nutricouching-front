import { useState } from "react";
import { createPortal } from "react-dom";
import ConfirmationModal from "../../../../../common/components/ConfirmationModal";
import useDeletePlan from "../../../hooks/useDeletePlan";
import useGetAllPlans from "../../../hooks/useGetAllPlans";
import useHandlePlanModals from "../../../hooks/useHandlePlanModals";
import "./PlansRootDashboard.css";
import NewPlanModal from "./modals/NewPlanModal";
import UpdatePlanModal from "./modals/UpdatePlanModal";
import DashboardListSkeleton from "../../../../../common/components/dashboard/loader/DashboardListSkeleton";

function PlansRootDashboard() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { flattedPlans, setPlans, plansLoading, plansError } = useGetAllPlans();

  const {
    isAddPlanModalOpen,
    isModifyPlanModalOpen,
    isDeletePlanModalOpen,
    handleAddPlanModal,
    openModifyPlanModal,
    closeModifyPlanModal,
    openDeletePlanModal,
    closeDeletePlanModal,
  } = useHandlePlanModals(setSelectedPlan);

  const { handleDeletePlan } = useDeletePlan(
    setPlans,
    selectedPlan,
    closeDeletePlanModal
  );

  return (
    <>
      <div className="plans-dashboard-container">
        {plansError ? (
          <p className="error">Ha ocurrido un error</p>
        ) : plansLoading ? (
          <DashboardListSkeleton />
        ) : flattedPlans?.length > 0 ? (
          <table className="plans-root-dashboard_table">
            <thead>
              <tr>
                <th className="image-column"></th>
                <th>Titulo</th>
                <th className="description-column">Descripcion</th>
                <th className="short-column">Resumen</th>
                <th className="price-column">Precio</th>
                <th className="options-column">Opciones</th>
              </tr>
            </thead>

            <tbody>
              {flattedPlans?.map((plan) => (
                <tr className="dashboard_plan-item" key={`plan-${plan.planId}`}>
                  <td className="image-row">
                    <div>
                      <img
                        src={plan.image}
                        alt="imagen de planes dashboard root"
                      />
                    </div>
                  </td>
                  <td>{plan.title}</td>
                  <td className="description-row">{plan.description}</td>
                  <td className="short-row">{plan.shortDescription}</td>
                  <td className="price-row">
                    {plan.price === 0 ? "FREE" : `$ ${plan.price}`}
                  </td>
                  <td className="options-row">
                    <p
                      className="edit"
                      onClick={() => openModifyPlanModal(plan)}
                    >
                      Editar
                    </p>
                    <p
                      className="delete"
                      onClick={() => openDeletePlanModal(plan.planId)}
                    >
                      Eliminar
                    </p>
                  </td>
                  <div className="divider-line_container">
                    <hr className="divider-line" />
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-plans">No hay planes aún</p>
        )}

        {!plansLoading && !plansError && (
          <div className="add-plan_btn">
            <button onClick={handleAddPlanModal}>Agregar plan</button>
          </div>
        )}
      </div>

      {isAddPlanModalOpen &&
        createPortal(
          <NewPlanModal
            setPlans={setPlans}
            handleAddPlanModal={handleAddPlanModal}
          />,
          document.getElementById("root-portal")
        )}

      {isModifyPlanModalOpen &&
        createPortal(
          <UpdatePlanModal
            selectedPlan={selectedPlan}
            setPlans={setPlans}
            closeModifyPlanModal={closeModifyPlanModal}
          />,
          document.getElementById("root-portal")
        )}

      {isDeletePlanModalOpen &&
        createPortal(
          <ConfirmationModal
            message="¿Eliminar plan?"
            onConfirm={handleDeletePlan}
            onClose={closeDeletePlanModal}
          />,
          document.getElementById("root-portal")
        )}
    </>
  );
}

export default PlansRootDashboard;
