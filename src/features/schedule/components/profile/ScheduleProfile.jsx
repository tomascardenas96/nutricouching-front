import { AiOutlineSchedule } from "react-icons/ai";
import { FaRegClock } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import useGetAvailabilitiesByProfessional from "../../hooks/useGetAvailabilitiesByProfessional";
import ScheduleCard from "./ScheduleCard";
import "./ScheduleProfile.css";
import { createPortal } from "react-dom";
import GetBooking from "../../../bookings/components/profile/GetBooking";

function ScheduleProfile({ professionalId }) {
  const {
    availabilities,
    availabilitiesLoading,
    availabilitiesError,
    setAvailabilities,
  } = useGetAvailabilitiesByProfessional(professionalId);

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
              schedules={availabilities[`${weekDay}`]}
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

      {true &&
        createPortal(<GetBooking professionalId={professionalId} />, document.getElementById("root-portal"))}
    </div>
  );
}

export default ScheduleProfile;
