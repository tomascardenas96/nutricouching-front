import ScheduleCard from "./ScheduleCard";
import "./ScheduleProfile.css";
import { FaRegClock } from "react-icons/fa";
import { AiOutlineSchedule } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";

function ScheduleProfile() {
  const schedules = {
    Mon: [
      {
        availabilityId: "4ab7478d-8365-4f15-9733-c43bf6f86411",
        startTime: "13:00",
        endTime: "21:00",
        interval: 60,
      },
      {
        availabilityId: "9ab7478d-8365-4f15-9733-c43bf6f86411",
        startTime: "21:00",
        endTime: "23:00",
        interval: 60,
      },
    ],
    Tue: [
      {
        availabilityId: "47f91740-2271-4ea7-9699-3244ee9a562d",
        startTime: "13:00",
        endTime: "21:00",
        interval: 60,
      },
    ],
    Wed: [
      {
        availabilityId: "019279e2-2a42-4e75-a388-60f91069fdad",
        startTime: "13:00",
        endTime: "21:00",
        interval: 60,
      },
    ],
    Thu: [
      {
        availabilityId: "02977aef-a963-4e7c-8e5e-18e1dc190b27",
        startTime: "13:00",
        endTime: "21:00",
        interval: 60,
      },
    ],
  };

  return (
    <div className="professional-profile_schedule-section">
      <div className="title">
        <div className="icon">
          <FaRegClock />
        </div>

        <div className="text">
          <h1>Horarios de Atencion</h1>
          <p>Consultas presenciales y virtuales.</p>
        </div>
      </div>

      <div className="body">
        <div className="schedules-list">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((weekDay) => (
            <ScheduleCard
              key={weekDay}
              day={weekDay}
              schedules={schedules[`${weekDay}`]}
            />
          ))}
        </div>

        <div className="get-booking">
          <button>
            <AiOutlineSchedule className="icon" />
            Solicitar Turno
            <IoIosArrowForward className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScheduleProfile;
