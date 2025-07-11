import ScheduleProfile from "../../schedule/components/profile/ScheduleProfile";
import "./RightContainer.css";

function RightContainer({ professionalId }) {
  return (
    <div className="profile-posts_left-container">
      <ScheduleProfile professionalId={professionalId} />
    </div>
  );
}

export default RightContainer;
