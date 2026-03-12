import { useState } from "react";
import { createPortal } from "react-dom";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaRegClock } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import NetworkError from "../../../../common/components/NetworkError";
import { useAuth } from "../../../auth/hooks/useAuth";
import GetBooking from "../../../bookings/components/profile/GetBooking";
import useGetAvailabilitiesByProfessional from "../../hooks/useGetAvailabilitiesByProfessional";
import WeekDaysSkeleton from "../loader/WeekDaysSkeleton";
import ScheduleCard from "./ScheduleCard";
import "./ScheduleProfile.css";

function ScheduleProfile({ professionalId, professionalName }) {
  const { user } = useAuth();
  // const { handleLoginModal } = useLoginModal();
  const {
    availabilities,
    availabilitiesLoading,
    availabilitiesError,
    setAvailabilities,
    isAvailabilitiesListEmpty,
  } = useGetAvailabilitiesByProfessional(professionalId);

  const [isGetBookingModalOpen, setIsGetBookingModalOpen] = useState(false);

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
        {availabilitiesError ? (
          <div className="error">
            <NetworkError message="Error" />
          </div>
        ) : availabilitiesLoading ? (
          <WeekDaysSkeleton />
        ) : (
          <div className="schedules-list">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
              (weekDay) => (
                <ScheduleCard
                  key={weekDay}
                  day={weekDay}
                  schedules={availabilities[`${weekDay}`]}
                />
              )
            )}
          </div>
        )}

        <div className="get-booking">
          <button
            onClick={() => {
              if (!user) {
                // handleLoginModal();
              } else {
                setIsGetBookingModalOpen(true);
              }
            }}
            disabled={
              availabilitiesLoading ||
              availabilitiesError ||
              isAvailabilitiesListEmpty
            }
            className={`${
              availabilitiesLoading ||
              availabilitiesError ||
              isAvailabilitiesListEmpty
                ? "disabled-btn"
                : undefined
            }`}
          >
            <AiOutlineSchedule className="icon" />
            Solicitar Turno
            <IoIosArrowForward className="icon" />
          </button>
        </div>
      </div>

      {isGetBookingModalOpen &&
        createPortal(
          <GetBooking
            professionalId={professionalId}
            professionalName={professionalName}
            onClose={() => setIsGetBookingModalOpen(false)}
            availabilities={availabilities}
            availabilitiesLoading={availabilitiesLoading}
            availabilitiesError={availabilitiesError}
          />,
          document.getElementById("root-portal")
        )}
    </div>
  );
}

export default ScheduleProfile;
