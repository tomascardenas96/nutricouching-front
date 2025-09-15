import LoaderSpinner from "../../../../common/components/LoaderSpinner";
import "./CategoriesLoader.css";

function CategoriesLoader() {
  return (
    <div className="categories-loader-container">
      <div className="item">
        <LoaderSpinner />
      </div>

      <div className="item">
        <LoaderSpinner />
      </div>

      <div className="item">
        <LoaderSpinner />
      </div>

      <div className="item">
        <LoaderSpinner />
      </div>

      <div className="item last-item">
        <LoaderSpinner />
      </div>
    </div>
  );
}

export default CategoriesLoader;
