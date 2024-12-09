import "./ScheduleProfessionalForm.css";

function ScheduleProfessionalForm() {
  return (
    <>
      <h1 className="manage-professional-modal_section-title">
        Horarios de atencion
        <span className="professionals-modal_required-field">*</span>
      </h1>

      <fieldset className="professional-business-days">
        <label htmlFor="monday" className="week-days_tags">
          <input type="checkbox" id="monday" name="monday" />
          Lunes
        </label>

        <label htmlFor="tuesday" className="week-days_tags">
          <input
            type="checkbox"
            id="tuesday"
            name="tuesday"
            onClick={(e) => console.log(e.target.checked)}
          />
          Martes
        </label>

        <label htmlFor="wednesday" className="week-days_tags">
          <input type="checkbox" id="wednesday" name="wednesday" />
          Miercoles
        </label>

        <label htmlFor="thursday" className="week-days_tags">
          <input type="checkbox" id="thursday" name="thursday" />
          Jueves
        </label>

        <label htmlFor="friday" className="week-days_tags">
          <input type="checkbox" id="friday" name="friday" />
          Viernes
        </label>

        <label htmlFor="saturday" className="week-days_tags">
          <input type="checkbox" id="saturday" name="saturday" />
          Sabado
        </label>

        <label htmlFor="sunday" className="week-days_tags">
          <input type="checkbox" id="sunday" name="sunday" />
          Domingo
        </label>
      </fieldset>

      <div className="manage-professionals_time-slot">
        <div>
          <h2>Desde:</h2>
          <input type="time" name="" id="" />
        </div>

        <div>
          <h2>Hasta:</h2>
          <input type="time" name="" id="" />
        </div>
      </div>

      <div className="manage-professionals_time-slot-button">
        <button>Agregar horario</button>
      </div>

      <p className="professional-modal_no-selected-data">
        No hay horarios agregados
      </p>
    </>
  );
}

export default ScheduleProfessionalForm;
