import LoaderSpinner from "../../../../common/components/LoaderSpinner";
import "./ScheduleProfileSkeleton.css";

function ScheduleProfileSkeleton() {
  return (
    <div className="schedule-profile-skeleton">
      <div>
        <LoaderSpinner />
      </div>
    </div>
  );
}

export default ScheduleProfileSkeleton;
