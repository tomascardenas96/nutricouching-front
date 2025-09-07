import LoaderSpinner from "../../LoaderSpinner";
import "./SchedulesSkeleton.css";

function SchedulesSkeleton() {
  return (
    <div className="schedules-skeleton-container">
      {new Array(4).fill(null).map((_, rowIndex) => (
        <div className="rows-list" key={`row-${rowIndex}`}>
          {new Array(5).fill(null).map((_, columnIndex) => (
            <LoaderSpinner key={`column-${columnIndex}`} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default SchedulesSkeleton;
