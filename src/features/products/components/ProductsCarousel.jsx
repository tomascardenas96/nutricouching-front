import { useMediaQuery } from "react-responsive";
import Dots from "../../../common/components/Dots";
import LoaderSpinner from "../../../common/components/LoaderSpinner";
import NetworkError from "../../../common/components/NetworkError";
import TurnPageArrow from "../../../common/components/TurnPageArrow";
import useHandleCarouselPages from "../hooks/useHandleCarouselPages";
import ProductCard from "./ProductCard";
import "./ProductsCarousel.css";

function ProductsCarousel({
  products,
  productsError,
  productsLoading,
  addProductToCart,
  productsCart,
  setProductsInCart,
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

  const { currentPage, currentProducts, nextPage, previousPage, totalPages } =
    useHandleCarouselPages(products, itemsPerPage);

  return (
    <div className="products-carousel_container">

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
              key={product.productId || product.viandId}
              product={product}
              products={products}
              setProductsInCart={setProductsInCart}
              addProductToCart={addProductToCart}
              productsCart={productsCart}
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

    </div>
  );
}

export default ProductsCarousel;
