import ScheduleProfile from "../../schedule/components/profile/ScheduleProfile";
import "./RightContainer.css";

function RightContainer({ professionalId, professionalName }) {
  return (
    <div className="profile-posts_left-container">
      <ScheduleProfile
        professionalId={professionalId}
        professionalName={professionalName}
      />
    </div>
  );
}

export default RightContainer;
