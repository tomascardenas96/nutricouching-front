import { useActiveCart } from "../../cart/hooks/useActiveCart";
import useAddItemToCart from "../../cart/hooks/useAddItemToCart";
import { useCartItems } from "../../cart/hooks/useCartItems";
import SectionTitle from "../../../common/section-title/SectionTitle";
import ProductsCarousel from "../../../common/products-carousel/ProductsCarousel";
import useGetLatestProducts from "../hooks/useGetLatestProducts";
import SeeMoreBtn from "../../../common/see-more-btn/SeeMoreBtn";
import "./ProductsHome.css";

function ProductsHomeSkeleton() {
  return (
    <div className="products-home__skeleton">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="products-home__skeleton-card">
          <div className="products-home__skeleton-image" />
          <div className="products-home__skeleton-body">
            <div className="products-home__skeleton-line products-home__skeleton-line--name" />
            <div className="products-home__skeleton-line products-home__skeleton-line--price" />
            <div className="products-home__skeleton-line products-home__skeleton-line--stock" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductsHome() {
  const { latestProducts, latestProductsLoading, latestProductsError } =
    useGetLatestProducts();

  const { activeCart } = useActiveCart();
  const { setElementsInCart } = useCartItems();
  const { addItemToCart } = useAddItemToCart(
    "product",
    setElementsInCart,
    activeCart,
  );

  return (
    <div className="products-home__container">
      <SectionTitle title="Nuestros Productos" showText={true} />

      {latestProductsLoading ? (
        <ProductsHomeSkeleton />
      ) : latestProductsError ? (
        <p className="products-home__message">
          No pudimos cargar los productos.
        </p>
      ) : latestProducts.length === 0 ? (
        <p className="products-home__message">No hay productos disponibles.</p>
      ) : (
        <ProductsCarousel
          items={latestProducts}
          addItemToCart={addItemToCart}
        />
      )}

      <SeeMoreBtn text="Más Productos" />
    </div>
  );
}

export default ProductsHome;
