import LoaderSpinner from "../../../../common/components/LoaderSpinner";
import "./GetBookingSkeleton.css";

function GetBookingSkeleton() {
  return (
    <div className="get-booking-skeleton_container">
      <div>
        <LoaderSpinner />
      </div>

      <div>
        <LoaderSpinner />
      </div>
    </div>
  );
}

export default GetBookingSkeleton;
