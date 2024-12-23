import { useEffect } from "react";
import { TbShoppingCartPlus } from "react-icons/tb";
import useAddProductToCart from "../../hooks/useAddProductToCart";
import useGetAllProducts from "../../hooks/useGetAllProducts";
import "./ProductCard.css";

function ProductCard({ product, productsInCart, setProductsInCart }) {
  const { addProductToCart, cart } = useAddProductToCart();
  const { products } = useGetAllProducts();

  // Tomamos los Id's de los productos del carrito y obtenemos los datos completos de cada uno.
  // Esto es para que el carrito muestre los productos con todos sus detalles.
  useEffect(() => {
    // Crear un array de productos que coincidan con el carrito
    const productsInCartToShow = products
      .map((product) => {
        const productInCart = cart?.find(
          (prodInCart) => prodInCart.productId === product.productId
        );
        return productInCart
          ? { ...product, quantity: productInCart.quantity } // Agregar detalles del carrito al producto
          : null; // Ignorar productos no encontrados
      })
      .filter((prod) => prod !== null); // Eliminar nulls del resultado

    setProductsInCart(productsInCartToShow);
  }, [cart, products]);

  return (
    <div
      className="product-card_container"
      onClick={() => addProductToCart(product)}
    >
      <div className="product-card_image">
        <img
          src={`http://localhost:3010/uploads/products/${product.image}`}
          alt="product-picture"
        />
        <TbShoppingCartPlus className="add-to-cart_icon" />
      </div>
      <div className="product-card_body">
        <div>
          <p className="product-title">{product.name}</p>
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
