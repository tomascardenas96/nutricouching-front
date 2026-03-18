import { useState } from "react";
import { createPortal } from "react-dom";
import ConfirmationModal from "../../../../../common/components/ConfirmationModal";
import DashboardListSkeleton from "../../../../../common/components/dashboard/loader/DashboardListSkeleton";
import { useSelectMenuOption } from "../../../../dashboard/hooks/useSelectMenuOption";
import useDeletePlan from "../../../hooks/useDeletePlan";
import useGetAllPlans from "../../../hooks/useGetAllPlans";
import useHandlePlanModals from "../../../hooks/useHandlePlanModals";
import NewPlanModal from "./modals/NewPlanModal";
import UpdatePlanModal from "./modals/UpdatePlanModal";
import "./PlansRootDashboard.css";

function PlansRootDashboard() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { flattedPlans, setPlans, plansLoading, plansError } = useGetAllPlans();
  const { searchTerm } = useSelectMenuOption();

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

  const { handleDeletePlan } = useDeletePlan(setPlans, selectedPlan, closeDeletePlanModal);

  const filtered = searchTerm
    ? flattedPlans.filter((p) => p.title?.toLowerCase().includes(searchTerm.toLowerCase()))
    : flattedPlans;

  return (
    <>
      <div className="plans-dashboard-container">
        {plansError ? (
          <p className="error">Ha ocurrido un error</p>
        ) : plansLoading ? (
          <DashboardListSkeleton />
        ) : filtered.length > 0 ? (
          <table className="plans-root-dashboard_table">
            <thead>
              <tr>
                <th className="image-column"></th>
                <th>Título</th>
                <th className="description-column">Descripción</th>
                <th className="short-column">Resumen</th>
                <th className="price-column">Precio</th>
                <th className="options-column">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((plan) => (
                <tr className="dashboard_plan-item" key={`plan-${plan.planId}`}>
                  <td className="image-row">
                    <div>
                      <img src={plan.image} alt="imagen de planes dashboard root" />
                    </div>
                  </td>
                  <td>{plan.title}</td>
                  <td className="description-row">{plan.description}</td>
                  <td className="short-row">{plan.shortDescription}</td>
                  <td className="price-row">{plan.price === 0 ? "FREE" : `$ ${plan.price}`}</td>
                  <td className="options-row">
                    <p className="edit" onClick={() => openModifyPlanModal(plan)}>Editar</p>
                    <p className="delete" onClick={() => openDeletePlanModal(plan.planId)}>Eliminar</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-plans">
            {searchTerm ? "Sin resultados para la búsqueda" : "No hay planes aún"}
          </p>
        )}

        {!plansLoading && !plansError && (
          <div className="add-plan_btn">
            <button onClick={handleAddPlanModal}>Agregar plan</button>
          </div>
        )}
      </div>

      {isAddPlanModalOpen &&
        createPortal(
          <NewPlanModal setPlans={setPlans} handleAddPlanModal={handleAddPlanModal} />,
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
