import "./AddScheduleCard.css";
import { LuTrash } from "react-icons/lu";

function AddScheduleCard({ schedule, spanishDays, unselectDay }) {
  /**
   * schedule:
   *   {
    startTime: '09:00',
    endTime: '17:00',
    interval: '60',
    day: ['Mon, 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ']
    }
   */

  return (
    <div className="selected-schedule_card">
      <div className="left-side">
        <div className="trash-icon" onClick={() => unselectDay(schedule)}>
          <LuTrash />
        </div>

        <div className="schedule-start-end-time">{schedule.startTime}</div>

        <div className="between-time">
          <p>
            {schedule.interval}
            <span>min</span>
          </p>
          <p>-</p>
        </div>

        <div className="schedule-start-end-time">{schedule.endTime}</div>
      </div>

      <div className="right-side">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => (
          <p key={day} className={`${day.toLowerCase()}`}>
            <span
              className={`${
                !schedule?.day?.some((d) => d === day) && "no-selected"
              }`}
            >
              {spanishDays[idx].toUpperCase()}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}

export default AddScheduleCard;
