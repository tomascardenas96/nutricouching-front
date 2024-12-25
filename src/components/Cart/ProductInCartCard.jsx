import { IoMdClose } from "react-icons/io";
import { HOST } from "../../api/data";
import "./ProductInCartCard.css";

function ProductInCartCard({ product, viand, remove, add, subtract }) {
  return (
    <div className="cart-product-card">
      <IoMdClose
        className="remove-product"
        onClick={() => remove(product || viand)}
      />
      <div className="cart-product_img">
        <img
          src={
            product
              ? `${HOST}/uploads/products/${product?.image}`
              : `${HOST}/uploads/viands/${viand?.image}`
          }
          alt="product-added-cart"
        />
      </div>

      <div className="cart-product_description">
        <p>{product?.name || viand?.name}</p>
      </div>

      <div className="cart-product_unit-price">
        <p>${product?.price || viand?.price}</p>
      </div>

      <div className="cart-product_amount">
        <span onClick={() => subtract(product || viand)}>-</span>
        <p>{product?.quantity || viand?.quantity}</p>
        <span onClick={() => add(product || viand)}>+</span>
      </div>

      <div className="cart-product_sub-total">
        <p>
          $
          {product?.price * product?.quantity || viand?.price * viand?.quantity}
        </p>
      </div>
    </div>
  );
}

export default ProductInCartCard;
