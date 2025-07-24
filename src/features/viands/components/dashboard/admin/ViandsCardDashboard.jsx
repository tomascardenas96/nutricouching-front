import { HOST } from "../../../../../api/data";
import "./ViandsCardDashboard.css";

function ViandsCardDashboard({
  viand,
  openEditViandModal,
  openDeleteViandModal,
}) {
  return (
    <>
      <tr className="dashboard_viand-item" key={`viand-${viand.viandId}`}>
        <td className="image-row">
          <div>
            <img src={viand.image} alt="imagen de vianda dashboard root" />
          </div>
        </td>
        <td>{viand.name}</td>
        <td className="stock-row">{viand.stock} u</td>
        <td className="price-row">$ {viand.price}</td>
        <td className="options-row">
          <p className="edit" onClick={() => openEditViandModal(viand)}>
            Editar
          </p>
          <p
            className="delete"
            onClick={() => openDeleteViandModal(viand.viandId)}
          >
            Eliminar
          </p>
        </td>
        <div className="divider-line_container">
          <hr className="divider-line" />
        </div>
      </tr>
    </>
  );
}

export default ViandsCardDashboard;
