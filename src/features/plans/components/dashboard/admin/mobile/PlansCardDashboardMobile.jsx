import { memo, useState } from "react";
import { createPortal } from "react-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ConfirmationModal from "../../../../../../common/components/ConfirmationModal";
import useDeletePlan from "../../../../hooks/useDeletePlan";
import "./PlansCardDashboardMobile.css";

const PlansCardDashboardMobile = memo(function PlansCardDashboardMobile({
  plan,
  setPlans,
  openModifyPlanModal,
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { handleDeletePlan } = useDeletePlan(setPlans, plan.planId, () =>
    setIsDeleteModalOpen(false)
  );

  return (
    <>
      <div className="plan-card-dashboard-container">
        <div className="image-container">
          <img src={plan.image} alt="foto del plan del dashboard superuser" />
        </div>

        <div className="info-container">
          <p className="name">{plan.title}</p>
          <p className="description">{plan.description}</p>
          <p className="price">{plan.price === 0 ? "FREE" : `$ ${plan.price}`}</p>

          <div className="buttons-container">
            <button className="edit-btn" onClick={() => openModifyPlanModal(plan)}>
              <FaEdit /> Editar
            </button>
            <button className="delete-btn" onClick={() => setIsDeleteModalOpen(true)}>
              <MdDelete /> Eliminar
            </button>
          </div>
        </div>
      </div>

      {isDeleteModalOpen &&
        createPortal(
          <ConfirmationModal
            onConfirm={handleDeletePlan}
            onClose={() => setIsDeleteModalOpen(false)}
            message="¿Desea eliminar este plan?"
          />,
          document.getElementById("root-portal")
        )}
    </>
  );
});

export default PlansCardDashboardMobile;
