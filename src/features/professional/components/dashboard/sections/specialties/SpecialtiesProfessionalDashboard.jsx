import useGetAllSpecialties from "../../../../../specialties/hooks/useGetAllSpecialties";
import "./SpecialtiesProfessionalDashboard.css";

function SpecialtiesProfessionalDashboard() {
  const { specialties } = useGetAllSpecialties();

  return (
    <table className="users-root-dashboard_table">
      <thead>
        <tr>
          <th>Especialidad</th>
          <th className="lastname-column">Servicio</th>
          <th className="options-column">Opciones</th>
        </tr>
      </thead>

      <tbody>
        {specialties.map((specialty) => (
          <tr
            className="dashboard_users-item"
            key={`specialty-${specialty.specialtyId}`}
          >
            <td>{specialty.name}</td>
            <td className="lastname-row">{specialty.service.title}</td>
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

export default SpecialtiesProfessionalDashboard;
