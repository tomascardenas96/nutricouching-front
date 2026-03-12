import { useState } from "react";
import "./ProductCard.css";

const formatPrice = (price) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price);

function ProductCard({ product, onAddToCart }) {
  const [adding, setAdding] = useState(false);
  const isOutOfStock = product.stock === 0;

  const handleClick = async () => {
    if (isOutOfStock || adding || !onAddToCart) return;
    setAdding(true);
    await onAddToCart(product);
    setTimeout(() => setAdding(false), 500);
  };

  return (
    <button
      className={`product-card${isOutOfStock ? " product-card--out-of-stock" : ""}${adding ? " product-card--adding" : ""}`}
      onClick={handleClick}
      disabled={isOutOfStock}
      aria-label={`Agregar ${product.name} al carrito`}
    >
      <div className="product-card__image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
        />
      </div>

      <div className="product-card__body">
        <p className="product-card__name">{product.name}</p>
        <p className="product-card__price">{formatPrice(product.price)}</p>
        <p className="product-card__stock">
          {isOutOfStock ? "Sin stock" : `${product.stock} unidades en stock`}
        </p>
      </div>
    </button>
  );
}

export default ProductCard;
