import React, { useEffect, useRef } from "react";
import ProductsCarousel from "./ProductsCarousel";
import "./Products.css";

function Products({ productsInCart, setProductsInCart }) {
  const h1Ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    const h1Element = h1Ref.current;
    if (h1Element) {
      observer.observe(h1Element);
    }

    return () => {
      if (h1Element) {
        observer.unobserve(h1Element);
      }
    };
  }, []);

  return (
    <div className="products-section_container">
      <div className="products-section">
        <div>
          <h1 ref={h1Ref} className="products-section_title">
            Echa un vistazo a algunos de nuestros productos, agrega al carrito
            el que mas te guste.
          </h1>
        </div>
      </div>
      <div className="products-container">
        <ProductsCarousel
          productsInCart={productsInCart}
          setProductsInCart={setProductsInCart}
        />
      </div>
    </div>
  );
}

export default Products;
