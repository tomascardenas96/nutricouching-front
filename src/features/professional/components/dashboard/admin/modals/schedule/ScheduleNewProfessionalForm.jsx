import React from "react";
import "./ScheduleNewProfessionalForm.css";

function ScheduleNewProfessionalForm({
  handleChangeDaysSchedule,
  handleChangeTimeRange,
  currentSchedule,
  addNewSchedule,
  selectedSchedules,
  spanishDays,
}) {
  return (
    <>
      <h1 className="manage-professional-modal_section-title">
        Horarios de atención
        <span className="professionals-modal_required-field">*</span>
      </h1>

      <fieldset className="professional-business-days">
        <legend>Seleccionar días hábiles:</legend>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => (
          <label key={day} className="week-days_tags">
            <input
              type="checkbox"
              value={day}
              checked={currentSchedule?.day?.includes(day)}
              onChange={handleChangeDaysSchedule}
            />
            {spanishDays[idx].charAt(0).toUpperCase() +
              spanishDays[idx].slice(1)}
          </label>
        ))}
      </fieldset>

      <div className="manage-professionals_time-slot">
        <div>
          <h2 className="start-end-time">Desde:</h2>
          <input
            type="time"
            name="startTime"
            value={currentSchedule.startTime || ""}
            onChange={handleChangeTimeRange}
          />
        </div>

        <div>
          <h2 className="start-end-time">Hasta:</h2>
          <input
            type="time"
            name="endTime"
            value={currentSchedule.endTime || ""}
            onChange={handleChangeTimeRange}
          />
        </div>
      </div>

      <div className="manage-professionals_time-slot-button">
        <div className="time-interval">
          <h2>Intervalo:</h2>
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
        </div>

        <button type="button" onClick={() => addNewSchedule(currentSchedule)}>
          Agregar horario
        </button>
      </div>

      {selectedSchedules?.length === 0 ? (
        <p className="professional-modal_no-selected-data">
          No hay días seleccionados.
        </p>
      ) : (
        selectedSchedules?.map((schedule, idx) => (
          <div key={idx} className="schedule-item">
            <h2>Turno {idx + 1}</h2>
            <div className="schedule_selected-days">
              {schedule.day.map((day, i) => (
                <span key={`${day}-${i}`} className="selected-day">
                  {spanishDays[
                    ["Mon", "Tue", "Wed", "Thu", "Fri", "Satu", "Sun"].indexOf(
                      day
                    )
                  ]
                    .charAt(0)
                    .toUpperCase() +
                    spanishDays[
                      [
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Satu",
                        "Sun",
                      ].indexOf(day)
                    ].slice(1)}
                </span>
              ))}
            </div>
            <p>
              Desde las {schedule.startTime}hs hasta las {schedule.endTime}hs
            </p>
          </div>
        ))
      )}
    </>
  );
}

export default ScheduleNewProfessionalForm;
