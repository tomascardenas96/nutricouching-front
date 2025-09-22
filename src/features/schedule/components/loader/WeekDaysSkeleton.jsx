import LoaderSpinner from "../../../../common/components/LoaderSpinner";
import "./WeekDaysSkeleton.css";

function WeekDaysSkeleton() {
  return (
    <div className="week-days-skeleton">
      {new Array(7).fill(null).map((wd) => (
        <div>
          <LoaderSpinner />
        </div>
      ))}
    </div>
  );
}

export default WeekDaysSkeleton;
