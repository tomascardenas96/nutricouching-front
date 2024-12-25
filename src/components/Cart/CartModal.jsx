import { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { SiMercadopago } from "react-icons/si";
import useAddOrSubtractProduct from "../../hooks/useAddOrSubtractProduct";
import useAddOrSubtractViand from "../../hooks/useAddOrSubtractViand";
import useRemoveProductFromCart from "../../hooks/useRemoveProductFromCart";
import useRemoveViandFromCart from "../../hooks/useRemoveViandFromCart";
import "./CartModal.css";
import ProductInCartCard from "./ProductInCartCard";

function CartModal({
  handleCartModal,
  productsInCart,
  setProductsInCart,
  viandsInCart,
  setViandsInCart,
}) {
  const [isProductsListDeployed, setIsProductsListDeployed] = useState(true);
  const [isViandsListDeployed, setIsViandsListDeployed] = useState(true);

  // Metodo para remover un producto o una vianda del carrito
  const { handleRemoveProduct } = useRemoveProductFromCart(
    setProductsInCart,
    productsInCart
  );

  const { handleRemoveViand } = useRemoveViandFromCart(
    setViandsInCart,
    viandsInCart
  );

  // Metodos para agregar o restar una unidad de un producto
  const { addUnityOfProduct, subtractUnityOfProduct } =
    useAddOrSubtractProduct(setProductsInCart);

  const { addUnityOfViand, subtractUnityOfViand } =
    useAddOrSubtractViand(setViandsInCart);

  // Metodos para abrir o cerrar la lista de productos o viandas
  const handleOpenCloseProductsList = () => {
    setIsProductsListDeployed(!isProductsListDeployed);
  };

  const handleOpenCloseViandsList = () => {
    setIsViandsListDeployed(!isViandsListDeployed);
  };

  // Metodo para calcular el total de la compra
  const calculateTotal = () => {
    const totalProducts = productsInCart?.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );

    const totalViands = viandsInCart?.reduce(
      (acc, viand) => acc + viand.price * viand.quantity,
      0
    );

    return totalProducts + totalViands;
  };

  return (
    <section className="cart-modal_container" onClick={handleCartModal}>
      <div className={`cart-modal`} onClick={(e) => e.stopPropagation()}>
        <div className="cart-modal_header">
          <img
            src="/src/public/assets/nutricouching-logo.jpg"
            alt="nutricoaching-logo"
          />
          <div>
            <h1>Carrito de Compras</h1>
            <p>Este es el carrito de Nutricoaching</p>
          </div>
        </div>

        <div className="cart-modal_products-list">
          <div
            className="cart-option_dropdown-bar"
            onClick={handleOpenCloseProductsList}
          >
            <p>PRODUCTOS</p>
            <IoMdArrowDropdown
              className={`down-arrow ${
                isProductsListDeployed ? "no-visible-arrow" : null
              }`}
            />
            <IoMdArrowDropup
              className={`up-arrow ${
                !isProductsListDeployed ? "no-visible-arrow" : null
              }`}
            />
          </div>

          {!productsInCart.length && (
            <div className="products-list_modal">
              <p>No hay productos agregados aun.</p>
            </div>
          )}

          {isProductsListDeployed && (
            <div className="products-in-cart_list-container">
              {productsInCart.map((product) => (
                <ProductInCartCard
                  key={`product-cart-${product.productId}`}
                  product={product}
                  remove={handleRemoveProduct}
                  add={addUnityOfProduct}
                  subtract={subtractUnityOfProduct}
                />
              ))}
            </div>
          )}
        </div>

        <div className="cart-modal_viands-list">
          <div
            className="cart-option_dropdown-bar"
            onClick={handleOpenCloseViandsList}
          >
            <p>VIANDAS</p>
            <IoMdArrowDropdown
              className={`down-arrow ${
                isViandsListDeployed ? "no-visible-arrow" : null
              }`}
            />
            <IoMdArrowDropup
              className={`up-arrow ${
                !isViandsListDeployed ? "no-visible-arrow" : null
              }`}
            />
          </div>

          {!viandsInCart.length && (
            <div className="viands-list_modal">
              <p>No hay viandas agregadas aun.</p>
            </div>
          )}

          {isViandsListDeployed && (
            <div className="products-in-cart_list-container">
              {viandsInCart.map((viand) => (
                <ProductInCartCard
                  key={`viand-cart-${viand.viandId}`}
                  viand={viand}
                  remove={handleRemoveViand}
                  add={addUnityOfViand}
                  subtract={subtractUnityOfViand}
                />
              ))}
            </div>
          )}
        </div>

        <div className="cart-modal_total">
          <h2>TOTAL: ${calculateTotal()}</h2>
        </div>

        <div className="cart-modal_buttons">
          <div>
            <button className="clean-cart">Vaciar Carrito</button>
          </div>
          <div>
            <button className="confirm-purchase">Realizar Compra</button>
            <SiMercadopago className="cart-option_icons mercado-pago_icon" />
          </div>
        </div>

        <div className="cart-modal_information">
          <p>Los precios estan sujetos a posibles variaciones</p>
        </div>
      </div>
    </section>
  );
}

export default CartModal;
