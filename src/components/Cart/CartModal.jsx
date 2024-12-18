import "./CartModal.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { SiMercadopago } from "react-icons/si";
import { GrClearOption } from "react-icons/gr";
import ProductInCartCard from "./ProductInCartCard";
import { useState } from "react";

function CartModal({ handleCartModal }) {
  const [isProductsListDeployed, setIsProductsListDeployed] = useState(true);
  const [isViandsListDeployed, setIsViandsListDeployed] = useState(true);

  const handleOpenCloseProductsList = () => {
    setIsProductsListDeployed(!isProductsListDeployed);
  };

  const handleOpenCloseViandsList = () => {
    setIsViandsListDeployed(!isViandsListDeployed);
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

          {false && (
            <div className="products-list_modal">
              <p>No hay productos agregados aun.</p>
            </div>
          )}

          {isProductsListDeployed && (
            <div className="products-in-cart_list-container">
              <ProductInCartCard />
              <ProductInCartCard />
              <ProductInCartCard />
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

          {false && (
            <div className="viands-list_modal">
              <p>No hay viandas agregadas aun.</p>
            </div>
          )}

          {isViandsListDeployed && (
            <div className="products-in-cart_list-container">
              <ProductInCartCard />
              <ProductInCartCard />
              <ProductInCartCard />
            </div>
          )}
        </div>

        <div className="cart-modal_total">
          <h2>TOTAL: $15.000</h2>
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
