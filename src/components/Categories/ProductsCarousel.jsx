import ProductCard from "./ProductCard";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import Dots from "../Common/Dots";
import "./ProductsCarousel.css";

function ProductsCarousel() {
  return (
    <div className="products-carousel_container">
      <div className="carousel-header">
        <p>Mirá los ultimos productos que ingresaron <span className="carousel-more">Ver más</span></p>
      </div>
      <div className="product-list">
        <ProductCard
          image="../../../src/public/assets/papitas.jpg"
          category="Celiacos"
          title="PAPAS FRITAS CLASICAS KRACHITOS S/TACC X 125gr."
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
          title="GALLETITAS DOMINOS LIBRES DE GLUTEN X 200gr."
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
        <ProductCard
          image="../../../src/public/assets/premezcla.png"
          category="Hipertrofia"
          title="HARINA PREMEZCLA S/TACC DOÑA ALEJANDRA x 500gr"
          kcal="30"
          price="2.300"
        />
        <ProductCard
          image="../../../src/public/assets/mermelada.png"
          category="Hipertrofia"
          title="MERMELADA BAGLEY S/AZUCAR X 450cc."
          kcal="30"
          price="1.700"
        />
        <div className="next-page">
          <MdArrowForwardIos />
        </div>
        <div className="products-carousel_dots">
          <Dots />
        </div>
      </div>
    </div>
  );
}

export default ProductsCarousel;
