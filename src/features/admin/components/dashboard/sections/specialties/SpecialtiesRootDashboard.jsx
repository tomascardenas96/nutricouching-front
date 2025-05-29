import useGetAllSpecialties from "../../../../../specialties/hooks/useGetAllSpecialties";
import "./SpecialtiesRootDashboard.css";

function SpecialtiesRootDashboard() {
  const { specialties } = useGetAllSpecialties();

  return (
    <table className="specialties-root-dashboard_table">
      <thead>
        <tr>
          <th>Descripcion</th>
          <th className="service-column">Servicio</th>
          <th className="options-column">Opciones</th>
        </tr>
      </thead>

      <tbody>
        {specialties?.map((specialty) => (
          <tr
            className="dashboard_specialty-item"
            key={`specialty-${specialty.specialtyId}`}
          >
            <td>{specialty.name}</td>
            <td className="service-row">{specialty.service.title}</td>
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

export default SpecialtiesRootDashboard;
