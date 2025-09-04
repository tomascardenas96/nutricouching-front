import { ImCheckmark, ImCross } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
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
    <dialog className="add-schedule-modal_container">
      <form
        className="add-schedule-modal"
        onSubmit={(e) => handleSubmitAddNewSchedule(e, selectedSchedules)}
      >
        <div className="add-schedule_title">
          <h1>Agregar nuevo horario</h1>
          <IoMdClose className="close-icon" onClick={onClose} />
        </div>

        <div className="add-schedule_body">
          <fieldset className="days-list">
            <legend>Elije los dias a agregar</legend>

            <div className="days-label">
              {/* Checkboxes con los dias de la semana */}
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

          {/* Horario de inicio y de fin del turno */}
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

              {/* Intervalo entre cada uno de los turnos */}
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
              {/* Boton para agregar una nueva franja horaria */}
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

        <div className="submit-add-schedule_options">
          <ImCross
            className="add-cancel-schedule add-cancel-schedule_close"
            onClick={onClose}
          />
          <div>
            <label htmlFor="add-schedule_submit">
              <input type="submit" id="add-schedule_submit" />
              <ImCheckmark className="add-cancel-schedule add-cancel-schedule_done" />
            </label>
          </div>
        </div>
      </form>
    </dialog>
  );
}

export default AddScheduleModal;
