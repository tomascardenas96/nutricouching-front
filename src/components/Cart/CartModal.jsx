import { useState } from "react";
import {
  IoIosArrowBack,
  IoMdArrowDropdown,
  IoMdArrowDropup,
} from "react-icons/io";
import useAddOrSubtractProduct from "../../hooks/useAddOrSubtractProduct";
import useAddOrSubtractViand from "../../hooks/useAddOrSubtractViand";
import useEmptyCart from "../../hooks/useEmptyCart";
import useRemoveProductFromCart from "../../hooks/useRemoveProductFromCart";
import useRemoveViandFromCart from "../../hooks/useRemoveViandFromCart";
import "./CartModal.css";
import ProductInCartCard from "./ProductInCartCard";
import PreferenceButton from "./payment/PreferenceButton";

function CartModal({
  handleCartModal,
  productsInCart,
  setProductsInCart,
  viandsInCart,
  setViandsInCart,
  user,
  activeCart,
  elementsInCart,
  setElementsInCart,
  handleLoginModal,
}) {
  const [isProductsListDeployed, setIsProductsListDeployed] = useState(true);
  const [isViandsListDeployed, setIsViandsListDeployed] = useState(true);

  // Obtenemos todos los elementos dentro del carrito
  const { handleEmptyCart, handleEmptyLocalStorageCart } = useEmptyCart(
    setElementsInCart,
    activeCart,
    setProductsInCart,
    setViandsInCart
  );

  // Metodos para remover un producto o una vianda del carrito
  const { handleRemoveProduct } = useRemoveProductFromCart(
    setProductsInCart,
    productsInCart
  );

  const { handleRemoveViand } = useRemoveViandFromCart(
    setViandsInCart,
    viandsInCart
  );

  // Metodos para agregar o restar una unidad de un producto
  const { addUnityOfProduct, subtractUnityOfProduct } = useAddOrSubtractProduct(
    activeCart,
    setProductsInCart,
    user,
    elementsInCart,
    setElementsInCart
  );

  const { addUnityOfViand, subtractUnityOfViand } = useAddOrSubtractViand(
    setViandsInCart,
    user,
    elementsInCart,
    setElementsInCart
  );

  // Metodos para abrir o cerrar la lista de productos o viandas
  const handleOpenCloseProductsList = () => {
    setIsProductsListDeployed(!isProductsListDeployed);
  };

  const handleOpenCloseViandsList = () => {
    setIsViandsListDeployed(!isViandsListDeployed);
  };

  // Metodo para calcular el total de la compra
  const calculateTotal = () => {
    // Si no hay usuario logueado calcular el total de los productos del local storage, de lo contrario sumar los totales desde la base de datos
    if (!user) {
      const subTotalProducts = productsInCart.reduce(
        (acc, product) => acc + product?.price * product.quantity,
        0
      );

      const subTotalViands = viandsInCart.reduce(
        (acc, viand) => acc + viand?.price * viand.quantity,
        0
      );

      return subTotalProducts + subTotalViands;
    }

    return elementsInCart.reduce(
      (acc, element) =>
        acc + element?.product?.price * element?.quantity ||
        acc + element?.viand?.price * element?.quantity,
      0
    );
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

        {/*  Productos dentro del carrito */}
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

          {!productsInCart.length &&
            isProductsListDeployed &&
            elementsInCart &&
            !elementsInCart?.some((element) => element.product) && (
              <div className="products-list_modal">
                <p>No hay productos agregados aun.</p>
              </div>
            )}

          {isProductsListDeployed && (
            <div className="products-in-cart_list-container">
              {productsInCart.length > 0 && !user
                ? productsInCart?.map((product) => (
                    <ProductInCartCard
                      key={`product-cart-local-${product.productId}`}
                      product={product}
                      quantity={product.quantity}
                      remove={handleRemoveProduct}
                      add={addUnityOfProduct}
                      subtract={subtractUnityOfProduct}
                      elementsInCart={elementsInCart}
                    />
                  ))
                : null}

              {elementsInCart?.length > 0 &&
                elementsInCart?.map(
                  (element) =>
                    element.product && (
                      <ProductInCartCard
                        key={`product-cart-${element.cartItemId}`}
                        product={element.product}
                        quantity={element.quantity}
                        remove={handleRemoveProduct}
                        add={addUnityOfProduct}
                        subtract={subtractUnityOfProduct}
                        elementsInCart={elementsInCart}
                      />
                    )
                )}
            </div>
          )}
        </div>

        {/*  Viandas dentro del carrito */}
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

          {!viandsInCart.length &&
            isViandsListDeployed &&
            elementsInCart &&
            !elementsInCart?.some((element) => element.viand) && (
              <div className="viands-list_modal">
                <p>No hay viandas agregadas aun.</p>
              </div>
            )}

          {isViandsListDeployed && (
            <div className="products-in-cart_list-container">
              {viandsInCart.length > 0 && !user
                ? viandsInCart?.map((viand) => (
                    <ProductInCartCard
                      key={`viand-cart-local-${viand.viandId}`}
                      viand={viand}
                      quantity={viand.quantity}
                      remove={handleRemoveViand}
                      add={addUnityOfViand}
                      subtract={subtractUnityOfViand}
                    />
                  ))
                : null}

              {elementsInCart?.length > 0 &&
                elementsInCart?.map(
                  (element) =>
                    element.viand && (
                      <ProductInCartCard
                        key={`viand-cart-${element.cartItemId}`}
                        viand={element.viand}
                        quantity={element.quantity}
                        remove={handleRemoveProduct}
                        add={addUnityOfProduct}
                        subtract={subtractUnityOfProduct}
                      />
                    )
                )}
            </div>
          )}
        </div>

        <div className="cart-modal_total">
          <h2>TOTAL: ${calculateTotal()}</h2>
        </div>

        <div className="cart-modal_buttons">
          <div className="options-buttons">
            <button
              className="clean-cart"
              onClick={user ? handleEmptyCart : handleEmptyLocalStorageCart}
            >
              Vaciar Carrito
            </button>
          </div>
          <div className="options-buttons">
            <PreferenceButton
              productsInCart={elementsInCart}
              activeCart={activeCart}
              user={user}
              handleCartModal={handleCartModal}
              handleLoginModal={handleLoginModal}
            />
          </div>
        </div>

        <div className="cart-modal_information">
          <p>Los precios estan sujetos a posibles variaciones</p>
        </div>

        <div className="close-modal" onClick={handleCartModal}>
          <div>
            <IoIosArrowBack className="back-icon" /> <span>Volver</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartModal;
