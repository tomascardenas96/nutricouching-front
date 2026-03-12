import ProductCard from "./ProductCard";
import "./ProductsCarousel.css";

function ProductsCarousel({ items, addItemToCart }) {
  return (
    <div className="products-carousel__grid">
      {items?.map((item) => (
        <ProductCard
          key={item.productId || item.viandId}
          product={item}
          onAddToCart={addItemToCart}
        />
      ))}
    </div>
  );
}

export default ProductsCarousel;
