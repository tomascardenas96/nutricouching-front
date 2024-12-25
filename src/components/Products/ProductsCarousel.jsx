import { MdArrowForwardIos } from "react-icons/md";
import useGetAllProducts from "../../hooks/useGetAllProducts";
import Dots from "../Common/Dots";
import ProductCard from "./ProductCard";
import "./ProductsCarousel.css";

function ProductsCarousel({ setProductsInCart }) {
  const {
    products,
    productsError,
    productsLoading,
    currentPage,
    currentProducts,
    nextPage,
    previousPage,
  } = useGetAllProducts();

  return (
    <div className="products-carousel_container">
      <div className="carousel-header">
        <p>
          Mirá los ultimos productos que ingresaron{" "}
          <span className="carousel-more">Ver más</span>
        </p>
      </div>
      <div className="product-list">
        {currentProducts?.map((product) => (
          <ProductCard
            key={product.productId}
            product={product}
            setProductsInCart={setProductsInCart}
          />
        ))}
      </div>
      <div className="next-page" onClick={nextPage}>
        <MdArrowForwardIos />
      </div>
      <div className="products-carousel_dots">
        <Dots />
      </div>
    </div>
  );
}

export default ProductsCarousel;
