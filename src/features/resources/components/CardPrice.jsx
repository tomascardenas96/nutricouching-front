import "./CardPrice.css";

function CardPrice({ type, price, isOffer }) {
  return (
    <>
      {type === "adquired" ? (
        <div className="card-price card-price_adquired">
          <p>Adquirido</p>
        </div>
      ) : type === "free" ? (
        <div className="card-price card-price_free">
          <p>Gratis</p>
          <span></span>
        </div>
      ) : !!isOffer ? (
        <div className="card-price card-price_off">
          <p>OFF!</p>
          <span>${price}</span>
        </div>
      ) : (
        <div className="card-price card-price_premium">
          <p>Precio</p>
          <span>${price}</span>
        </div>
      )}
    </>
  );
}

export default CardPrice;
