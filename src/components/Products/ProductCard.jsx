import "./ProductCard.css";

function ProductCard({ image, description, name, stock, price }) {
  return (
    <div className="product-card_container">
      <div className="product-card_image">
        <img
          src={`http://localhost:3010/uploads/products/${image}`}
          alt="product-picture"
        />
      </div>
      <div className="product-card_body">
        <div>
          <p className="product-title">{name}</p>
        </div>
        <div>
          <p className="product-description">Stock: {stock} unidades</p>
        </div>
        <div>
          <h1 className="product-price">
            <p>${price}</p>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
