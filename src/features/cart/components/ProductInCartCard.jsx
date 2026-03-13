import { IoMdClose } from "react-icons/io";
import "./ProductInCartCard.css";

function ProductInCartCard({
  product,
  viand,
  quantity,
  remove,
  add,
  subtract,
  elementsInCart,
}) {
  const item = product || viand;

  return (
    <div className="cart-product-card">
      <button
        className="remove-product"
        onClick={() => remove(item)}
        aria-label="Eliminar"
      >
        <IoMdClose />
      </button>

      <div className="cart-product_img">
        <img src={item?.image} alt={item?.name} />
      </div>

      <div className="cart-product_info">
        <p className="cart-product_description">{item?.name}</p>
        <p className="cart-product_unit-price">${item?.price} c/u</p>

        <div className="cart-product_row">
          <div className="cart-product_amount">
            <span onClick={() => subtract(item)}>−</span>
            <p>{quantity}</p>
            <span onClick={() => add(item)}>+</span>
          </div>
          <p className="cart-product_sub-total">
            ${item?.price * quantity}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductInCartCard;
