import { useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import "./Carousel.css";

function Carousel() {
  const images = ["a.jpg", "b.jpg", "c.jpg"];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [loaded, setLoaded] = useState(false);

  const previous = () => {
    setLoaded(false);
    const condition = selectedIndex > 0;
    setTimeout(() => {
      const nextIndex = condition ? selectedIndex - 1 : images.length - 1;
      setSelectedImage(images[nextIndex]);
      setSelectedIndex(nextIndex);
    }, 500);
  };

  const next = () => {
    setLoaded(false);
    setTimeout(() => {
      const condition = selectedIndex < images.length - 1;
      const nextIndex = condition ? selectedIndex + 1 : 0;
      setSelectedImage(images[nextIndex]);
      setSelectedIndex(nextIndex);
    }, 500);
  };

  return (
    <section className="carousel_container">
      <h1 className="carousel-recipes_header">
        Proba nuestro menu de viandas semanales...
      </h1>
      <div className="carousel">
        <div className="recipe-card_text">
          <div className="number-recipe">
            <h1>01</h1>
          </div>
          <div className="author-recipe">
            <h1>NATASHA DIRIALDI</h1>
          </div>
          <div className="name-recipe">
            <h1>Selección de Lentejas y Vegetales</h1>
          </div>
          <div className="ingredients-recipe">
            <p>
              <span style={{ textDecoration: "underline" }}>Ingredientes:</span>{" "}
              lentejas cocidas, cebolla picada, ajo picado, zanahoria rallada,
              pan rallado, avena, harina, comino, pimentón, orégano, sal,
              pimienta, aceite de oliva.
              <br />
              <br />
              <p>
                Una vianda saludable que combina croquetas de lentejas ricas en
                proteínas y fibra con vegetales frescos y especias naturales.
                Perfecta para quienes buscan una comida nutritiva y llena de
                sabor.
              </p>
            </p>
          </div>
          <div className="footer-recipe">
            <div className="decoration-line"></div>
            <div className="see-recipe">
              <p>COMPRAR</p>
              <FaArrowRight />
            </div>
          </div>
        </div>
        <div className="recipe-card_img">
          <img
            src={`../../../src/public/assets/${selectedImage}`}
            alt=""
            className={loaded ? "loaded" : ""}
            onLoad={() => setLoaded(true)}
          />
        </div>
        <MdArrowBackIosNew
          className="carousel-btn carousel-btn_left"
          onClick={() => previous()}
        />
        <MdArrowForwardIos
          className="carousel-btn carousel-btn_right"
          onClick={() => next()}
        />
      </div>
    </section>
  );
}

export default Carousel;
