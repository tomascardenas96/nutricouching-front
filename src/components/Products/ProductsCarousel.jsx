import { useMediaQuery } from "react-responsive";
import useGetAllProducts from "../../hooks/useGetAllProducts";
import Dots from "../Common/Dots";
import LoaderSpinner from "../Common/LoaderSpinner";
import NetworkError from "../Common/NetworkError";
import TurnPageArrow from "../Common/TurnPageArrow";
import ProductCard from "./ProductCard";
import "./ProductsCarousel.css";

function ProductsCarousel({
  setProductsInCart,
  activeCart,
  setElementsInCart,
}) {
  const firstMeasure = useMediaQuery({ query: "(max-width: 1260px)" });
  const secondMeasure = useMediaQuery({ query: "(max-width: 970px)" });
  const thirdMeasure = useMediaQuery({ query: "(max-width: 815px)" });
  const fourthMeasure = useMediaQuery({ query: "(max-width: 470px)" });

  let itemsPerPage = 5;

  if (firstMeasure) {
    itemsPerPage = 4;
  }

  if (secondMeasure) {
    itemsPerPage = 3;
  }

  if (thirdMeasure) {
    itemsPerPage = 2;
  }

  if (fourthMeasure) {
    itemsPerPage = 1;
  }

  const {
    products,
    productsError,
    productsLoading,
    currentPage,
    currentProducts,
    nextPage,
    previousPage,
  } = useGetAllProducts(itemsPerPage);

  return (
    <div className="products-carousel_container">
      <div className="carousel-header">
        <p>
          Mirá los ultimos productos que ingresaron{" "}
          <span className="carousel-more">Ver más</span>
        </p>
      </div>

      <div className="product-list">
        {/* Loader */}
        {productsLoading && (
          <div className="product-list_loader-container">
            {[...Array(itemsPerPage)].map((_, index) => (
              <div
                className="loader-spinner_products"
                key={`products-loader_${index}`}
              >
                <LoaderSpinner />
              </div>
            ))}
          </div>
        )}

        {!productsLoading &&
          !productsError &&
          currentProducts?.map((product) => (
            <ProductCard
              key={product.productId}
              product={product}
              setProductsInCart={setProductsInCart}
              activeCart={activeCart}
              setElementsInCart={setElementsInCart}
            />
          ))}

        {productsError && (
          <div className="network-error_products">
            <NetworkError message="Ocurrio un error al cargar el contenido" />
          </div>
        )}
      </div>

      <div className="previous-page">
        <TurnPageArrow
          color="#296eb4"
          direction="left"
          turnPage={previousPage}
        />
      </div>

      <div className="next-page">
        <TurnPageArrow color="#296eb4" direction="right" turnPage={nextPage} />
      </div>

      <div className="products-carousel_dots">
        <Dots />
      </div>
    </div>
  );
}

export default ProductsCarousel;
