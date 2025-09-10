import LoaderSpinner from "../../LoaderSpinner";
import "./DashboardListSkeleton.css";

function DashboardListSkeleton() {
  return (
    <div className="schedules-skeleton-container">
      {new Array(4).fill(null).map((_, rowIndex) => (
        <div className="rows-list" key={`row-${rowIndex}`}>
          {new Array(4).fill(null).map((_, columnIndex) => (
            <LoaderSpinner key={`column-${columnIndex}`} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default DashboardListSkeleton;
