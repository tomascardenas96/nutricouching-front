import { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { SiMercadopago } from "react-icons/si";
import { useElementsInCart } from "../../context/ElementsInCartProvider";
import useAddOrSubtractProduct from "../../hooks/useAddOrSubtractProduct";
import useAddOrSubtractViand from "../../hooks/useAddOrSubtractViand";
import useRemoveProductFromCart from "../../hooks/useRemoveProductFromCart";
import useRemoveViandFromCart from "../../hooks/useRemoveViandFromCart";
import "./CartModal.css";
import ProductInCartCard from "./ProductInCartCard";
import useAddElementsToCartWhenLogin from "../../hooks/useAddElementsToCartWhenLogin";

function CartModal({
  handleCartModal,
  productsInCart,
  setProductsInCart,
  viandsInCart,
  setViandsInCart,
  user,
}) {
  const { elementsInCart, setElementsInCart } = useElementsInCart();

  const [isProductsListDeployed, setIsProductsListDeployed] = useState(true);
  const [isViandsListDeployed, setIsViandsListDeployed] = useState(true);

  const { addElementsError } = useAddElementsToCartWhenLogin(setElementsInCart);

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
  const { addUnityOfProduct, subtractUnityOfProduct } = useAddOrSubtractProduct(
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
              {viandsInCart.length > 0 &&
                viandsInCart.map((viand) => (
                  <ProductInCartCard
                    key={`viand-cart-local-${viand.viandId}`}
                    viand={viand}
                    quantity={viand.quantity}
                    remove={handleRemoveViand}
                    add={addUnityOfViand}
                    subtract={subtractUnityOfViand}
                  />
                ))}

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
