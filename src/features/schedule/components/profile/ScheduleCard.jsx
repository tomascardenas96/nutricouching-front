import { getSpanishDay } from "../../../../lib/date";
import "./ScheduleCard.css";
import { GoDotFill } from "react-icons/go";

function ScheduleCard({ day, schedules }) {
  return (
    <div
      className={`schedule-card ${
        schedules ? "schedule-card_green" : "schedule-card_gray"
      }`}
    >
      <p className="day">
        <GoDotFill
          className={`${schedules ? "dot-icon_green" : "dot-icon_gray"}`}
        />
        {getSpanishDay(day)}
      </p>
      <div className="time-gap_container">
        {schedules ? (
          schedules.map((schedule) => (
            <p
              key={schedule.availabilityId}
              className="time-gap time-gap_opened"
            >
              {schedule.startTime} - {schedule.endTime}
            </p>
          ))
        ) : (
          <p className="time-gap time-gap_closed">Cerrado</p>
        )}
      </div>
    </div>
  );
}

export default ScheduleCard;
