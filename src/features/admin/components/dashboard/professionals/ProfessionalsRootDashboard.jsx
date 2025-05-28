import { HOST } from "../../../../../api/data";
import useGetProfessionals from "../../../../professional/hooks/useGetProfessionals";
import "./ProfessionalsRootDashboard.css";

function ProfessionalsRootDashboard() {
  const { professionals } = useGetProfessionals();

  return (
    <table className="professionals-root-dashboard_table">
      <thead>
        <tr>
          <th className="image-column"></th>
          <th>Nombre Completo</th>
          <th className="email-column">E-mail</th>
          <th className="phone-column">Telefono</th>
          <th className="role-column">Rol</th>
          <th className="options-column">Opciones</th>
        </tr>
      </thead>

      <tbody>
        {professionals.map((professional) => (
          <tr
            className="dashboard_professional-item"
            key={`professional-${professional.professionalId}`}
          >
            <td className="image-row">
              <div>
                <img
                  src={`${HOST}/uploads/professionals/${professional.image}`}
                  alt="fotos de los profesionales en el dashboard root"
                />
              </div>
            </td>
            <td>{professional.fullname}</td>
            <td className="email-row">{professional.email}</td>
            <td className="phone-row">{professional.phone}</td>
            <td className="role-row">{professional.role}</td>
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

export default ProfessionalsRootDashboard;
