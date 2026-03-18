import "./ScheduleNewProfessionalForm.css";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAY_LABELS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];

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
      <p className="schedule-section-title">
        Horarios de atención
        <span className="professionals-modal_required-field">*</span>
      </p>

      {/* Day toggles */}
      <div className="schedule-days-grid">
        {DAYS.map((day, idx) => (
          <label
            key={day}
            className={`schedule-day-pill${currentSchedule?.day?.includes(day) ? " is-checked" : ""}`}
          >
            <input
              type="checkbox"
              value={day}
              checked={currentSchedule?.day?.includes(day)}
              onChange={handleChangeDaysSchedule}
            />
            {DAY_LABELS[idx]}
          </label>
        ))}
      </div>

      {/* Time + interval row */}
      <div className="schedule-time-row">
        <div className="schedule-time-field">
          <label>Desde</label>
          <input
            type="time"
            name="startTime"
            value={currentSchedule.startTime || ""}
            onChange={handleChangeTimeRange}
          />
        </div>

        <div className="schedule-time-field">
          <label>Hasta</label>
          <input
            type="time"
            name="endTime"
            value={currentSchedule.endTime || ""}
            onChange={handleChangeTimeRange}
          />
        </div>

        <div className="schedule-time-field">
          <label>Intervalo</label>
          <select
            name="interval"
            onChange={handleChangeTimeRange}
            value={currentSchedule.interval || ""}
          >
            <option value="">—</option>
            {[15, 30, 45, 60].map((n) => (
              <option key={n} value={n}>
                {n} min
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="button"
        className="schedule-add-btn"
        onClick={() => addNewSchedule(currentSchedule)}
      >
        + Agregar horario
      </button>

      {/* Added schedules */}
      {selectedSchedules?.length === 0 ? (
        <p className="schedule-empty">No hay horarios configurados aún.</p>
      ) : (
        <div className="schedule-cards-list">
          {selectedSchedules.map((schedule, idx) => (
            <div key={idx} className="schedule-card">
              <span className="schedule-card__index">#{idx + 1}</span>

              <div className="schedule-card__days">
                {schedule.day.map((day, i) => {
                  const dayIdx = DAYS.indexOf(day);
                  const label = dayIdx !== -1
                    ? spanishDays[dayIdx].slice(0, 3)
                    : day;
                  return (
                    <span key={`${day}-${i}`} className="schedule-card__day-tag">
                      {label.charAt(0).toUpperCase() + label.slice(1)}
                    </span>
                  );
                })}
              </div>

              <span className="schedule-card__time">
                {schedule.startTime} – {schedule.endTime}
              </span>

              {schedule.interval && (
                <span className="schedule-card__interval">
                  c/{schedule.interval}min
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ScheduleNewProfessionalForm;
