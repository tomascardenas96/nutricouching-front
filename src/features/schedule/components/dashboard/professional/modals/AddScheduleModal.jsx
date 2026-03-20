import BaseModal from "../../../../../../common/components/BaseModal";
import useAddNewScheduleToProfessional from "../../../../../professional/hooks/useAddNewScheduleToProfessional";
import useHandleProfessionalSchedule from "../../../../../professional/hooks/useHandleProfessionalSchedule";
import AddScheduleCard from "./AddScheduleCard";
import "./AddScheduleModal.css";

function AddScheduleModal({ onClose, setAvailabilities }) {
  const {
    addNewSchedule,
    currentSchedule,
    handleChangeDaysSchedule,
    handleChangeTimeRange,
    selectedSchedules,
    spanishDays,
    unselectDay,
  } = useHandleProfessionalSchedule();

  const { handleSubmitAddNewSchedule } = useAddNewScheduleToProfessional(
    setAvailabilities,
    selectedSchedules,
    onClose
  );

  return (
    <BaseModal
      isOpen={true}
      onClose={onClose}
      onSubmit={(e) => handleSubmitAddNewSchedule(e, selectedSchedules)}
      title="Agregar nuevo horario"
      size="md"
      footer={
        <div className="bm-footer__actions">
          <button
            type="button"
            className="bm-btn bm-btn--secondary"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button type="submit" className="bm-btn bm-btn--primary">
            Guardar
          </button>
        </div>
      }
    >
      <div className="add-schedule_body">
        <fieldset className="days-list">
          <legend>Elije los dias a agregar</legend>
          <div className="days-label">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
              (day, idx) => (
                <label key={day}>
                  <input
                    type="checkbox"
                    value={day}
                    checked={currentSchedule?.day?.includes(day)}
                    onChange={handleChangeDaysSchedule}
                  />
                  <span>
                    {spanishDays[idx].charAt(0).toUpperCase() +
                      spanishDays[idx].slice(1)}
                  </span>
                </label>
              )
            )}
          </div>
        </fieldset>

        <fieldset className="schedules-select">
          <legend>Seleccione los horarios</legend>
          <div className="select-fields">
            <label htmlFor="" className="start-label">
              Inicio
              <input
                type="time"
                name="startTime"
                value={currentSchedule.startTime || ""}
                onChange={handleChangeTimeRange}
              />
            </label>
            <label htmlFor="" className="end-label">
              Fin
              <input
                type="time"
                name="endTime"
                value={currentSchedule.endTime || ""}
                onChange={handleChangeTimeRange}
              />
            </label>
            <label htmlFor="" className="interval-label">
              Int.
              <select
                name="interval"
                onChange={handleChangeTimeRange}
                value={currentSchedule.interval || ""}
              >
                <option value="">-</option>
                {[15, 30, 45, 60].map((numb) => (
                  <option key={numb} value={numb}>
                    {numb} minutos
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="add-schedule-gap_btn">
            <button
              type="button"
              onClick={() => addNewSchedule(currentSchedule)}
            >
              Agregar horario
            </button>
          </div>
        </fieldset>

        <div className="schedules-selected_list">
          {selectedSchedules &&
            selectedSchedules.map((schedule, index) => (
              <AddScheduleCard
                key={`schedule-card_${index}`}
                schedule={schedule}
                spanishDays={spanishDays}
                unselectDay={unselectDay}
              />
            ))}
          {selectedSchedules?.length === 0 && (
            <p>No hay horarios seleccionados.</p>
          )}
        </div>
      </div>
    </BaseModal>
  );
}

export default AddScheduleModal;
