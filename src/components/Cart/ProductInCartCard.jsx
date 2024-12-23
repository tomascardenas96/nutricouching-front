import { IoMdClose } from "react-icons/io";
import { HOST } from "../../api/data";
import useAddOrSubtractProduct from "../../hooks/useAddOrSubtractProduct";
import useRemoveProductFromCart from "../../hooks/useRemoveProductFromCart";
import "./ProductInCartCard.css";

function ProductInCartCard({ product, setProductsInCart, productsInCart }) {
  const { addUnityOfProduct, subtractUnityOfProduct } =
    useAddOrSubtractProduct(setProductsInCart);

  const { handleRemoveProduct } = useRemoveProductFromCart(
    setProductsInCart,
    productsInCart
  );

  return (
    <div className="cart-product-card">
      <IoMdClose
        className="remove-product"
        onClick={() => handleRemoveProduct(product)}
      />
      <div className="cart-product_img">
        <img
          src={`${HOST}/uploads/products/${product?.image}`}
          alt="product-added-cart"
        />
      </div>

      <div className="cart-product_description">
        <p>{product?.name}</p>
      </div>

      <div className="cart-product_unit-price">
        <p>${product?.price}</p>
      </div>

      <div className="cart-product_amount">
        <span onClick={() => subtractUnityOfProduct(product)}>-</span>
        <p>{product?.quantity}</p>
        <span onClick={() => addUnityOfProduct(product)}>+</span>
      </div>

      <div className="cart-product_sub-total">
        <p>${product?.price * product?.quantity}</p>
      </div>
    </div>
  );
}

export default ProductInCartCard;
