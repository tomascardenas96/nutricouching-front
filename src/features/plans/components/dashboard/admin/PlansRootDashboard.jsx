import { createPortal } from "react-dom";
import { HOST } from "../../../../../api/data";
import useGetAllPlans from "../../../hooks/useGetAllPlans";
import useHandlePlanModals from "../../../hooks/useHandlePlanModals";
import "./PlansRootDashboard.css";
import NewPlanModal from "./modals/NewPlanModal";

function PlansRootDashboard() {
  const { flattedPlans } = useGetAllPlans();

  const {
    isAddPlanModalOpen,
    isModifyPlanModalOpen,
    isDeletePlanModalOpen,
    handleAddPlanModal,
    openModifyPlanModal,
    closeModifyPlanModal,
    openDeletePlanModal,
    closeDeletePlanModal,
  } = useHandlePlanModals();

  return (
    <>
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
          {flattedPlans?.length > 0 ? (
            flattedPlans?.map((plan) => (
              <tr className="dashboard_plan-item" key={`plan-${plan.planId}`}>
                <td className="image-row">
                  <div>
                    <img
                      src={`${HOST}/uploads/plans/images/${plan.image}`}
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
                  <p className="edit">Editar</p>
                  <p className="delete">Eliminar</p>
                </td>
                <div className="divider-line_container">
                  <hr className="divider-line" />
                </div>
              </tr>
            ))
          ) : (
            <tr>
              <th
                colSpan={6}
                style={{ textAlign: "center" }}
                className="no-plans"
              >
                No hay planes aún.
              </th>
            </tr>
          )}
        </tbody>
      </table>

      <div className="add-plan_btn">
        <button onClick={handleAddPlanModal}>Agregar plan</button>
      </div>

      {isAddPlanModalOpen &&
        createPortal(<NewPlanModal />, document.getElementById("root"))}
    </>
  );
}

export default PlansRootDashboard;
