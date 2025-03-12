import { useEffect, useState } from "react";
import { HOST } from "../../api/data";
import useGetAllViands from "../../hooks/useGetAllViands";
import "./Carousel.css";
import RecipeCard from "./RecipeCard";

function Carousel({ setViandsInCart, activeCart, setElementsInCart }) {
  const [selectedViand, setSelectedViand] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const { viands } = useGetAllViands();

  // Dependiendo del indice seleccionado, se muestra la informacion completa de la vianda
  useEffect(() => {
    setSelectedViand(viands[selectedIndex]);
  }, [selectedIndex, viands]);

  // Funcion para retroceder un indice en el carousel
  const previous = () => {
    setLoaded(false);
    const condition = selectedIndex > 0;
    setTimeout(() => {
      const nextIndex = condition ? selectedIndex - 1 : viands.length - 1;
      setSelectedIndex(nextIndex);
    }, 500);
  };

  // Funcion para avanzar un indice en el carousel
  const next = () => {
    setLoaded(false);
    setTimeout(() => {
      const condition = selectedIndex < viands.length - 1;
      const nextIndex = condition ? selectedIndex + 1 : 0;
      setSelectedIndex(nextIndex);
    }, 500);
  };

  return (
    <section className="carousel_container">
      <h1 className="carousel-recipes_header">
        Proba nuestro menu de viandas semanales...
      </h1>

      <div className="viand-carousel_container">
        <RecipeCard
          previous={previous}
          next={next}
          viand={selectedViand}
          setLoaded={setLoaded}
          loaded={loaded}
          index={selectedIndex}
          setViandsInCart={setViandsInCart}
          allViands={viands}
          activeCart={activeCart}
          setElementsInCart={setElementsInCart}
        />
      </div>

      <div className="carousel_all-viands">
        <div className="all-viands_list">
          {viands.map((viand, index) => (
            <div
              key={`viand-${viand.viandId}`}
              className={`all-viands_item ${
                selectedIndex === index ? "selected" : ""
              }`}
              onClick={() => {
                setLoaded(false);
                setSelectedIndex(index);
              }}
            >
              <img
                src={`${HOST}/uploads/viands/${viand.image}`}
                alt="viand-image_carousel"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="recipes-carousel_footer"></div>
    </section>
  );
}

export default Carousel;
