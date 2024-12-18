import "./ProductInCartCard.css";

function ProductInCartCard() {
  return (
    <div className="cart-product-card">
      <div className="cart-product_img">
        <img src="/src/public/assets/masitas.jpg" alt="product-added-cart" />
      </div>

      <div className="cart-product_description">
        <p>Dulce de leche Cachafaz s/tacc x 125gr</p>
      </div>

      <div className="cart-product_unit-price">
        <p>$4150</p>
      </div>

      <div className="cart-product_amount">
        <span>-</span>
        <p>2</p>
        <span>+</span>
      </div>

      <div className="cart-product_sub-total">
        <p>$8300</p>
      </div>
    </div>
  );
}

export default ProductInCartCard;
