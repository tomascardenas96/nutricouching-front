import { IoMdClose } from "react-icons/io";
import useAddNewScheduleToProfessional from "../../../../hooks/useAddNewScheduleToProfessional";
import useHandleProfessionalSchedule from "../../../../hooks/useHandleProfessionalSchedule";
import "./AddScheduleModal.css";

function AddScheduleModal({ setIsAddScheduleModalOpen }) {
  const {
    addNewSchedule,
    currentSchedule,
    handleChangeDaysSchedule,
    handleChangeTimeRange,
    selectedSchedules,
    spanishDays,
  } = useHandleProfessionalSchedule();

  const { handleSubmitAddNewSchedule } = useAddNewScheduleToProfessional();

  return (
    <dialog className="add-schedule-modal_container">
      <div className="add-schedule-modal">
        <div className="">
          <h1>Agregar nuevo horario</h1>
          <IoMdClose
            className=""
            onClick={() => setIsAddScheduleModalOpen(false)}
          />
        </div>

        <form
          onSubmit={(e) => handleSubmitAddNewSchedule(e, selectedSchedules)}
        >
          <fieldset>
            <legend>Elije los dias a agregar</legend>

            {/* Checkboxes con los dias de la semana */}
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
              (day, idx) => (
                <label key={day} className="">
                  <input
                    type="checkbox"
                    value={day}
                    checked={currentSchedule?.day?.includes(day)}
                    onChange={handleChangeDaysSchedule}
                  />
                  {spanishDays[idx].charAt(0).toUpperCase() +
                    spanishDays[idx].slice(1)}
                </label>
              )
            )}
          </fieldset>

          {/* Horario de inicio y de fin del turno */}
          <fieldset>
            <legend>Seleccione los horarios</legend>
            <label htmlFor="">
              Inicio
              <input
                type="time"
                name="startTime"
                value={currentSchedule.startTime || ""}
                onChange={handleChangeTimeRange}
              />
            </label>

            <label htmlFor="">
              Fin
              <input
                type="time"
                name="endTime"
                value={currentSchedule.endTime || ""}
                onChange={handleChangeTimeRange}
              />
            </label>

            {/* Intervalo entre cada uno de los turnos */}
            <label htmlFor="">
              Intervalo
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

            {/* Boton para agregar una nueva franja horaria */}
            <button
              type="button"
              onClick={() => addNewSchedule(currentSchedule)}
            >
              Agregar horario
            </button>
          </fieldset>

          <input type="submit" value="Agregar" />
        </form>
      </div>
    </dialog>
  );
}

export default AddScheduleModal;
