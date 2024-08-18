import ProductCard from "./ProductCard";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import "./ProductsCarousel.css";

function ProductsCarousel() {
  return (
    <div className="products-carousel_container">
      <ProductCard
        image="../../../src/public/assets/papitas.jpg"
        category="Celiacos"
        title="PAPAS FRITAS KRACHITOS X 125gr."
        kcal="90"
        price="1.800"
      />
      <ProductCard
        image="../../../src/public/assets/ddl.jpg"
        category="Sobre-peso"
        title="DULCE DE LECHE CACHAFAZ X 500gr."
        kcal="110"
        price="5.600"
      />
      <ProductCard
        image="../../../src/public/assets/masitas.jpg"
        category="Celiacos"
        title="GALLETITAS DOMINOS X 200gr."
        kcal="80"
        price="1.950"
      />
      <ProductCard
        image="../../../src/public/assets/proteina.jpg"
        category="Hipertrofia"
        title="PROTEINA SOYPROTEIN PULVER X 1KG"
        kcal="30"
        price="25.000"
      />
      <MdArrowBackIosNew className="products-carousel_arrows arrow-left" />
      <MdArrowForwardIos className="products-carousel_arrows arrow-forward" />
    </div>
  );
}

export default ProductsCarousel;
