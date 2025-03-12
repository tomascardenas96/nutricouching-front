import { useEffect } from "react";
import { BsCart4 } from "react-icons/bs";
import { HOST } from "../../api/data";
import { useElementsInCart } from "../../context/ElementsInCartProvider";
import useAddViandToCart from "../../hooks/useAddViandToCart";
import TurnPageArrow from "../Common/TurnPageArrow";
import "./RecipeCard.css";

function RecipeCard({
  previous,
  next,
  viand,
  setLoaded,
  loaded,
  index,
  setViandsInCart,
  allViands,
  activeCart,
  setElementsInCart,
}) {
  const { addViandToCart, viandsCart, setViandsCart } = useAddViandToCart(
    setElementsInCart,
    activeCart
  );

  // Funcion para rellenar con ceros a la izquierda
  function pad(toPad, padChar, length) {
    return String(toPad).length < length
      ? new Array(length - String(toPad).length + 1).join(padChar) +
          String(toPad)
      : toPad;
  }

  // Actualizar el estado de las viandas en el carrito cuando se monta el componente, es necesario para que se actualice el carrito al recargar la página
  useEffect(() => {
    // Crear un array de productos que coincidan con el carrito
    const viandsInCartToShow = allViands
      .map((viand) => {
        const viandInCart = viandsCart?.viands?.find((viaInCart) => {
          return viaInCart.viandId === viand.viandId;
        });
        return viandInCart
          ? { ...viand, quantity: viandInCart.quantity } // Agregar detalles del carrito al producto
          : null; // Ignorar productos no encontrados
      })
      .filter((via) => via !== null); // Eliminar nulls del resultado

    setViandsInCart(viandsInCartToShow);
  }, [viandsCart, allViands]);

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
              <span
                style={{ textDecoration: "underline" }}
                className="ingredients-span"
              >
                Ingredientes:
              </span>{" "}
              {viand?.ingredients?.length > 0
                ? viand?.ingredients
                    ?.map((ingredient) => ingredient.name)
                    .join(", ")
                : "No hay ingredientes"}
              <br />
              <span className="recipe-description">{viand?.description}</span>
            </p>
          </div>

          <div className="price-recipe">
            <h1>
              Precio: <span>${viand?.price}</span>
            </h1>
          </div>

          <div className="footer-recipe">
            <div className="decoration-line"></div>
            <div className="see-recipe">
              <p onClick={() => addViandToCart(viand)}>AGREGAR AL CARRITO</p>
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

        <div className="carousel-btn carousel-btn_left">
          <TurnPageArrow color="#00a650" direction="left" turnPage={previous} />
        </div>

        <div className="carousel-btn carousel-btn_right">
          <TurnPageArrow color="#00a650" direction="right" turnPage={next} />
        </div>
      </div>
    </section>
  );
}

export default RecipeCard;
