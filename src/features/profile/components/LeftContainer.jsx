import ScheduleProfile from "../../schedule/components/profile/ScheduleProfile";
import "./LeftContainer.css";

function LeftContainer({ professionalId }) {
  return (
    <div className="profile-posts_left-container">
      <ScheduleProfile professionalId={professionalId} />
    </div>
  );
}

export default LeftContainer;
