import { useMemo, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { BsCart3 } from "react-icons/bs";
import { useAuth } from "../../auth/hooks/useAuth";
import useAddOrSubtractElement from "../hooks/useAddOrSubtractElement";
import useAddOrSubtractViand from "../hooks/useAddOrSubtractViand";
import { useCartItems } from "../hooks/useCartItems";
import useEmptyCart from "../hooks/useEmptyCart";
import { useProductCart } from "../hooks/useProductsCart";
import useRemoveProductFromCart from "../hooks/useRemoveProductFromCart";
import useRemoveViandFromCart from "../hooks/useRemoveViandFromCart";
import { useViandsCart } from "../hooks/useViandsCart";
import useAddOrSubtractProduct from "../../products/hooks/useAddOrSubtractProduct";
import "./CartModal.css";
import ProductInCartCard from "./ProductInCartCard";
import PreferenceButton from "./payment/PreferenceButton";

function CartModal({ handleCartModal, activeCart }) {
  const [isProductsListDeployed, setIsProductsListDeployed] = useState(true);
  const [isViandsListDeployed, setIsViandsListDeployed] = useState(true);

  const { user } = useAuth();
  const { productsInCart, setProductsInCart } = useProductCart();
  const { viandsInCart, setViandsInCart } = useViandsCart();
  const { elementsInCart, setElementsInCart } = useCartItems();

  const { handleEmptyCart, handleEmptyLocalStorageCart } = useEmptyCart(
    setElementsInCart,
    activeCart,
    setProductsInCart,
    setViandsInCart,
  );

  // Guest handlers
  const { handleRemoveProduct } = useRemoveProductFromCart(setProductsInCart);
  const { handleRemoveViand } = useRemoveViandFromCart(setViandsInCart);
  const { addUnityOfProduct, subtractUnityOfProduct } =
    useAddOrSubtractProduct(setProductsInCart);
  const { addUnityOfViand, subtractUnityOfViand } =
    useAddOrSubtractViand(setViandsInCart);

  // Logged-in handlers (operate by cartItemId)
  const { handleAddOrSubtractElement, handleRemoveElement } =
    useAddOrSubtractElement(setElementsInCart);

  const productsFromElements = useMemo(
    () => elementsInCart.filter((e) => e.product),
    [elementsInCart],
  );
  const viandsFromElements = useMemo(
    () => elementsInCart.filter((e) => e.viand),
    [elementsInCart],
  );

  const calculateTotal = useMemo(() => {
    if (!user) {
      const subTotalProducts = productsInCart.reduce(
        (acc, p) => acc + (p?.price ?? 0) * p.quantity,
        0,
      );
      const subTotalViands = viandsInCart.reduce(
        (acc, v) => acc + (v?.price ?? 0) * v.quantity,
        0,
      );
      return subTotalProducts + subTotalViands;
    }
    return elementsInCart.reduce((acc, element) => {
      const price = element?.product?.price ?? element?.viand?.price ?? 0;
      return acc + price * (element?.quantity ?? 0);
    }, 0);
  }, [user, productsInCart, viandsInCart, elementsInCart]);

  const totalProductCount = user
    ? productsFromElements.reduce((acc, e) => acc + e.quantity, 0)
    : productsInCart.reduce((acc, p) => acc + p.quantity, 0);

  const totalViandCount = user
    ? viandsFromElements.reduce((acc, e) => acc + e.quantity, 0)
    : viandsInCart.reduce((acc, v) => acc + v.quantity, 0);

  return (
    <section className="cart-modal_container" onClick={handleCartModal}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        {/* ── Header ── */}
        <div className="cart-modal_header">
          <div className="cart-modal_header-icon">
            <BsCart3 />
          </div>
          <div className="cart-modal_header-text">
            <h1>Carrito de Compras</h1>
            <p>Cohesiva Salud</p>
          </div>
          <button
            className="cart-modal_close-btn"
            onClick={handleCartModal}
            aria-label="Cerrar carrito"
          >
            <IoIosArrowBack />
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="cart-modal_body">
          {/* Productos */}
          <div className="cart-modal_section">
            <button
              className="cart-section_header"
              onClick={() => setIsProductsListDeployed(!isProductsListDeployed)}
            >
              <span className="cart-section_label">Productos</span>
              {totalProductCount > 0 && (
                <span className="cart-section_badge">{totalProductCount}</span>
              )}
              <span
                className={`cart-section_chevron ${isProductsListDeployed ? "cart-section_chevron--open" : ""}`}
              >
                ▾
              </span>
            </button>

            <div
              className={`cart-section_list ${isProductsListDeployed ? "cart-section_list--open" : ""}`}
            >
              {!productsInCart.length && !productsFromElements.length && (
                <div className="cart-empty-state">
                  <p>No hay productos aún</p>
                </div>
              )}
              {!user &&
                productsInCart.map((product) => (
                  <ProductInCartCard
                    key={`product-cart-local-${product.productId}`}
                    product={product}
                    quantity={product.quantity}
                    remove={handleRemoveProduct}
                    add={addUnityOfProduct}
                    subtract={subtractUnityOfProduct}
                  />
                ))}
              {productsFromElements.map((element) => (
                <ProductInCartCard
                  key={`product-cart-${element.cartItemId}`}
                  product={element.product}
                  quantity={element.quantity}
                  remove={() => handleRemoveElement(element.cartItemId)}
                  add={() =>
                    handleAddOrSubtractElement(element.cartItemId, "add")
                  }
                  subtract={() =>
                    handleAddOrSubtractElement(element.cartItemId, "subtract")
                  }
                />
              ))}
            </div>
          </div>

          {/* Viandas */}
          <div className="cart-modal_section">
            <button
              className="cart-section_header"
              onClick={() => setIsViandsListDeployed(!isViandsListDeployed)}
            >
              <span className="cart-section_label">Viandas</span>
              {totalViandCount > 0 && (
                <span className="cart-section_badge">{totalViandCount}</span>
              )}
              <span
                className={`cart-section_chevron ${isViandsListDeployed ? "cart-section_chevron--open" : ""}`}
              >
                ▾
              </span>
            </button>

            <div
              className={`cart-section_list ${isViandsListDeployed ? "cart-section_list--open" : ""}`}
            >
              {!viandsInCart.length && !viandsFromElements.length && (
                <div className="cart-empty-state">
                  <p>No hay viandas aún</p>
                </div>
              )}
              {!user &&
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
              {viandsFromElements.map((element) => (
                <ProductInCartCard
                  key={`viand-cart-${element.cartItemId}`}
                  viand={element.viand}
                  quantity={element.quantity}
                  remove={() => handleRemoveElement(element.cartItemId)}
                  add={() =>
                    handleAddOrSubtractElement(element.cartItemId, "add")
                  }
                  subtract={() =>
                    handleAddOrSubtractElement(element.cartItemId, "subtract")
                  }
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Footer fijo ── */}
        <div className="cart-modal_footer">
          <div className="cart-modal_total">
            <span className="cart-total_label">Total</span>
            <span className="cart-total_amount">
              ${calculateTotal.toLocaleString("es-AR")}
            </span>
          </div>

          <div className="cart-modal_buttons">
            <button
              className="cart-btn cart-btn--secondary"
              onClick={user ? handleEmptyCart : handleEmptyLocalStorageCart}
            >
              Vaciar
            </button>
            <PreferenceButton
              productsInCart={elementsInCart}
              activeCart={activeCart}
              user={user}
              handleCartModal={handleCartModal}
            />
          </div>

          <p className="cart-modal_disclaimer">
            Los precios están sujetos a posibles variaciones
          </p>
        </div>
      </div>
    </section>
  );
}

export default CartModal;
