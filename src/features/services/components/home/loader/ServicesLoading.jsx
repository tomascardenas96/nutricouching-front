import LoaderSpinner from "../../../../../common/components/LoaderSpinner";
import "./ServicesLoading.css";

function ServicesLoading() {
  return [...Array(4)].map((_, index) => (
    <div key={`services-loader_${index}`} className="loader-spinner_services">
      <LoaderSpinner />
    </div>
  ));
}

export default ServicesLoading;
