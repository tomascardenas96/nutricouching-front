import { useEffect, useState } from "react";
import useGetAllViands from "../hooks/useGetAllViands";
import NetworkError from "../../../common/components/NetworkError";
import ViandCard from "./ViandCard";
import "./Viands.css";
import CarouselLoader from "./loader/CarouselLoader";
import ViandsListLoader from "./loader/ViandsListLoader";
import ViandCarousel from "./ViandsCarousel";

function Viands() {
  const [selectedViand, setSelectedViand] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const { viands, viandsLoading, viandsError } = useGetAllViands();

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
    <section className="carousel_container" id="viands">
      <h1 className="carousel-recipes_header">
        Proba nuestro menu de viandas semanales...
      </h1>

      <div className="viand-carousel_container">
        {viandsLoading || viandsError ? (
          <CarouselLoader />
        ) : (
          <ViandCard
            previous={previous}
            next={next}
            viand={selectedViand}
            setLoaded={setLoaded}
            loaded={loaded}
            index={selectedIndex}
            allViands={viands}
          />
        )}
      </div>

      <div className="carousel_all-viands">
        {!viandsError &&
          (viandsLoading ? (
            <ViandsListLoader />
          ) : (
            <ViandCarousel
              viands={viands}
              setLoaded={setLoaded}
              setSelectedIndex={setSelectedIndex}
              selectedIndex={selectedIndex}
            />
          ))}

        {viandsError && (
          <div className="network-error_viands">
            <NetworkError message="Ocurrio un error al cargar el contenido" />
          </div>
        )}
      </div>

      <div className="recipes-carousel_footer"></div>
    </section>
  );
}

export default Viands;
