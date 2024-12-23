import { useEffect, useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import "./Carousel.css";
import useGetAllViands from "../../hooks/useGetAllViands";
import RecipeCard from "./RecipeCard";
import { HOST } from "../../api/data";

function Carousel() {
  const images = ["a.jpg", "b.jpg", "c.jpg"];
  const [selectedViand, setSelectedViand] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const { viands } = useGetAllViands();

  useEffect(() => {
    setSelectedViand(viands[selectedIndex]);
  }, [selectedIndex, viands]);

  const previous = () => {
    setLoaded(false);
    const condition = selectedIndex > 0;
    setTimeout(() => {
      const nextIndex = condition ? selectedIndex - 1 : viands.length - 1;
      setSelectedIndex(nextIndex);
    }, 500);
  };

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
        />

        <div className="carousel_all-viands">
          <div className="all-viands_list">
            {viands.map((viand, index) => (
              <div
                key={viand._id}
                className={`all-viands_item ${
                  selectedIndex === index ? "selected" : ""
                }`}
                onClick={() => {
                  setLoaded(false);
                  setSelectedIndex(index);
                }}
              >
                <img src={`${HOST}/uploads/viands/${viand.image}`} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Carousel;
