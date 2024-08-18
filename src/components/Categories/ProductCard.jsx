import "./ProductCard.css";
import { IoCartOutline } from "react-icons/io5";

function ProductCard({ image, category, title, kcal, price }) {
  return (
    <div className="product-card_container">
      <div className="product-card_header">
        <div>
          <p>{category}</p>
        </div>
        <div>
          <IoCartOutline className="product-card_cart-icon" />
        </div>
      </div>
      <div className="product-card_image">
        <img src={image} alt="" />
      </div>
      <div className="product-card_body">
        <div>
          <p className="product-title">{title}</p>
        </div>
        <div>
          <p className="product-description">Valor calorico: {kcal}kcal</p>
        </div>
        <div>
          <h1 className="product-price">${price}</h1>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
