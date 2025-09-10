import "./SpecialtiesProfessionalCardDashboardMobile.css";

function SpecialtiesProfessionalCardDashboardMobile({ specialty, onDelete }) {
  return (
    <div className="specialty-card-dashboard-container">
      <div className="specialty-info-container">
        <p className="specialty-name">{specialty.name}</p>

        <div className="specialty-details">
          {specialty.description && (
            <p className="specialty-description">{specialty.description}</p>
          )}

          {specialty.category.name && (
            <p className="specialty-description"><span>Categoria: </span>{specialty.category.name}</p>
          )}
        </div>

        <div className="buttons-container">
          <button className="delete-btn" onClick={onDelete}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default SpecialtiesProfessionalCardDashboardMobile;
