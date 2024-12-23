import { FaArrowRight } from "react-icons/fa";
import "./RecipeCard.css";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { HOST } from "../../api/data";

function RecipeCard({
  previous,
  next,
  viand,
  setLoaded,
  loaded,
  index,
}) {
  function pad(toPad, padChar, length) {
    return String(toPad).length < length
      ? new Array(length - String(toPad).length + 1).join(padChar) +
          String(toPad)
      : toPad;
  }

  return (
    <section>
      <div className="carousel">
        <div className="recipe-card_text">
          <div className="number-recipe">
            <h1>{pad(index + 1, 0, 2)}</h1>
          </div>
          <div className="author-recipe">
            <h1>NATASHA DIRIALDI</h1>
          </div>
          <div className="name-recipe">
            <h1>{viand?.name}</h1>
          </div>
          <div className="ingredients-recipe">
            <p>
              <span style={{ textDecoration: "underline" }}>Ingredientes:</span>{" "}
              lentejas cocidas, cebolla picada, ajo picado, zanahoria rallada,
              pan rallado, avena, harina, comino, pimentón, orégano, sal,
              pimienta, aceite de oliva.
              <br />
              <br />
              <span>{viand?.description}</span>
            </p>
          </div>
          <div className="footer-recipe">
            <div className="decoration-line"></div>
            <div className="see-recipe">
              <p>AGREGAR AL CARRITO</p>
              <BsCart4 className="cart-icon" />
            </div>
          </div>
        </div>
        <div className="recipe-card_img">
          <img
            src={`${HOST}/uploads/viands/${viand?.image}`}
            alt="viand-picture"
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

export default RecipeCard;
