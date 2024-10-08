import "./ProductCard.css";

function ProductCard({ image, category, title, kcal, price }) {
  return (
    <div className="product-card_container">
      <div className="product-card_image">
        <img src={image} alt="product-picture" />
      </div>
      <div className="product-card_body">
        <div>
          <p className="product-title">{title}</p>
        </div>
        <div>
          <p className="product-description">Valor energetico: {kcal}kcal</p>
        </div>
        <div>
          <h1 className="product-price">
            <p>${price}</p>
            <span>00</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
