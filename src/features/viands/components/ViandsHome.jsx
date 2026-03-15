import useAddItemToCart from "../../cart/hooks/useAddItemToCart";
import { useCartItems } from "../../cart/hooks/useCartItems";
import SectionTitle from "../../../common/section-title/SectionTitle";
import ProductsCarousel from "../../../common/products-carousel/ProductsCarousel";
import useGetLatestViands from "../hooks/useGetLatestViands";
import SeeMoreBtn from "../../../common/see-more-btn/SeeMoreBtn";
import "./ViandsHome.css";

function ViandsHomeSkeleton() {
  return (
    <div className="viands-home__skeleton">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="viands-home__skeleton-card">
          <div className="viands-home__skeleton-image" />
          <div className="viands-home__skeleton-body">
            <div className="viands-home__skeleton-line viands-home__skeleton-line--name" />
            <div className="viands-home__skeleton-line viands-home__skeleton-line--price" />
            <div className="viands-home__skeleton-line viands-home__skeleton-line--stock" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ViandsHome() {
  const { latestViands, latestViandsLoading, latestViandsError } =
    useGetLatestViands();

  const { setElementsInCart } = useCartItems();
  const { addItemToCart } = useAddItemToCart("viand", setElementsInCart);

  return (
    <div className="viands-home__container">
      <SectionTitle title="Viandas Saludables" showText={true} />

      {latestViandsLoading ? (
        <ViandsHomeSkeleton />
      ) : latestViandsError ? (
        <p className="viands-home__message">No pudimos cargar las viandas.</p>
      ) : latestViands.length === 0 ? (
        <p className="viands-home__message">No hay viandas disponibles.</p>
      ) : (
        <ProductsCarousel items={latestViands} addItemToCart={addItemToCart} />
      )}

      <SeeMoreBtn text="Más Viandas" />
    </div>
  );
}

export default ViandsHome;
