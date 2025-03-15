import LoaderSpinner from "../../Common/LoaderSpinner";
import "./ViandsListLoader.css";

function ViandsListLoader() {
  return (
    <div className="loader_carousel">
      {[...Array(5)].map((_, index) => (
        <div key={`viand-loader_${index}`} className="viand-card_loader">
          <LoaderSpinner />
        </div>
      ))}
    </div>
  );
}

export default ViandsListLoader;
