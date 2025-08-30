import { createPortal } from "react-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ConfirmationModal from "../../../../../../common/components/ConfirmationModal";
import useDeletePlan from "../../../../hooks/useDeletePlan";
import useHandlePlanModals from "../../../../hooks/useHandlePlanModals";
import "./PlansCardDashboardMobile.css";

function PlansCardDashboardMobile({
  plan,
  setPlans,
  openModifyPlanModal,
  setSelectedPlan,
}) {
  const { handleDeletePlan } = useDeletePlan(setPlans);

  const { isDeletePlanModalOpen, openDeletePlanModal, closeDeletePlanModal } =
    useHandlePlanModals(setSelectedPlan);

  return (
    <>
      <div className="plan-card-dashboard-container">
        <div className="image-container">
          <img src={plan.image} alt="foto del plan del dashboard superuser" />
        </div>

        <div className="info-container">
          <p className="name">
            {" "}
            <b>Nombre:</b>
            {plan.title}
          </p>

          <p>
            <b>Descripción:</b>
            {plan.description}
          </p>

          <p>
            <b>Precio:</b>$ {plan.price}
          </p>

          <div className="buttons-container">
            <button
              className="edit-btn"
              onClick={() => openModifyPlanModal(plan)}
            >
              <FaEdit /> Editar
            </button>
            <button
              className="delete-btn"
              onClick={() => openDeletePlanModal(plan.planId)}
            >
              <MdDelete />
              Eliminar
            </button>
          </div>
        </div>
      </div>

      {isDeletePlanModalOpen &&
        createPortal(
          <ConfirmationModal
            onConfirm={handleDeletePlan}
            onClose={closeDeletePlanModal}
            message="¿Desea eliminar este plan?"
          />,
          document.getElementById("root")
        )}
    </>
  );
}

export default PlansCardDashboardMobile;
