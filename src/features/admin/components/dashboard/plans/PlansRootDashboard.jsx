import { useState } from "react";
import { HOST } from "../../../../../api/data";
import useGetAllPlans from "../../../../plans/hooks/useGetAllPlans";
import "./PlansRootDashboard.css";

function PlansRootDashboard() {
  const { flattedPlans } = useGetAllPlans();

  return (
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
                  src={`${HOST}/uploads/plans/images/${plan.image}`}
                  alt="imagen de planes dashboard root"
                />
              </div>
            </td>
            <td>{plan.title}</td>
            <td className="description-row">{plan.description}</td>
            <td className="short-row">{plan.shortDescription}</td>
            <td className="price-row">$ {plan.price}</td>
            <td className="options-row">
              <p className="edit">Editar</p>
              <p className="delete">Eliminar</p>
            </td>
            <div className="divider-line_container">
              <hr className="divider-line" />
            </div>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PlansRootDashboard;
