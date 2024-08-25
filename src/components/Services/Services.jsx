import React, { useEffect, useRef } from "react";
import ServiceCard from "./ServicesCard";
import "./Services.css";
import { FaArrowRight } from "react-icons/fa6";
import ProductsCarousel from "../Categories/ProductsCarousel";

function Services() {
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
        threshold: 0.1,
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
    <div className="services">
      <div className="services-section">
        <div>
          <h1 ref={h1Ref} className="scroll-animated">
            Echa un vistazo a algunos de nuestros productos, agrega al carrito
            el que mas te guste.
          </h1>
        </div>
      </div>
      <div className="products-container">
        <ProductsCarousel h1Ref={h1Ref} />
        {/* <div className="see-more-products">
          <p>Ver más</p>
          <FaArrowRight className="enter-here" />
        </div> */}
      </div>
    </div>
  );
}

export default Services;
