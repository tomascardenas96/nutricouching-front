import { useEffect } from "react";
import { TbShoppingCartPlus } from "react-icons/tb";
import { HOST } from "../../../api/data";
import "./ProductCard.css";

function ProductCard({
  product,
  products,
  setProductsInCart,
  addProductToCart,
  productsCart,
}) {
  // Tomamos los Id's de los productos del carrito y obtenemos los datos completos de cada uno.
  // Esto es para que el carrito muestre los productos con todos sus detalles.
  useEffect(() => {
    // Crear un array de productos que coincidan con el carrito
    const productsInCartToShow = products
      .map((product) => {
        const productInCart = productsCart?.products?.find((prodInCart) => {
          return prodInCart.productId === product.productId;
        });

        return productInCart
          ? { ...product, quantity: productInCart.quantity } // Agregar detalles del carrito al producto
          : null; // Ignorar productos no encontrados
      })
      .filter((prod) => prod !== null); // Eliminar nulls del resultado

    const viandsInCartToShow = products
      .map((viand) => {
        const viandsInCart = productsCart?.viands?.find((prodInCart) => {
          return prodInCart.viandId === viand.viandId;
        });

        return viandsInCart
          ? { ...viand, quantity: viandsInCart.quantity } // Agregar detalles del carrito al producto
          : null; // Ignorar productos no encontrados
      })
      .filter((prod) => prod !== null); // Eliminar nulls del resultado

    if (productsInCartToShow.length > 0) {
      setProductsInCart(productsInCartToShow);
    }

    if (viandsInCartToShow.length > 0) {
      setProductsInCart(viandsInCartToShow);
    }
  }, [productsCart, products]);

  return (
    <div
      className="product-card_container"
      onClick={() => {
        addProductToCart(product);
      }}
    >
      <div className="product-card_image">
        <img src={product.image} alt="product-picture" />
        <TbShoppingCartPlus className="add-to-cart_icon" />
      </div>

      <div className="product-card_body">
        <div>
          <p className="product-title">{product.name.toUpperCase()}</p>
        </div>
        <div>
          <p className="product-description">Stock: {product.stock} unidades</p>
        </div>
        <div>
          <h1 className="product-price">
            <p>${product.price}</p>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
