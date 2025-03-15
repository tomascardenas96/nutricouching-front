import LoaderSpinner from "../../Common/LoaderSpinner";
import "./CarouselLoader.css";

function CarouselLoader() {
  return (
    <section className="prue">
      <div className="carousel_loader">
        <div className="recipe-card_text_loader">
          <div className="number-recipe_loader">
            <LoaderSpinner />
          </div>

          <div className="author-recipe_loader">
            <LoaderSpinner />
          </div>

          <div className="name-recipe_loader">
            <LoaderSpinner />
          </div>

          <div className="ingredients-recipe_loader">
            <LoaderSpinner />
          </div>

          <div className="price-recipe_loader">
            <LoaderSpinner />
          </div>

          <div className="footer-recipe_loader">
            <LoaderSpinner />
          </div>
        </div>

        <div className="recipe-card_img_loader">
          <LoaderSpinner />
        </div>
      </div>
    </section>
  );
}

export default CarouselLoader;
