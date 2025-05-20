import { useEffect } from "react";
import { TbShoppingCartPlus } from "react-icons/tb";
import { HOST } from "../../../api/data";
import { useActiveCart } from "../../cart/hooks/useActiveCart";
import { useCartItems } from "../../cart/hooks/useCartItems";
import { useProductCart } from "../../cart/hooks/useProductsCart";
import useAddProductToCart from "../../cart/hooks/useAddProductToCart";
import useGetAllProducts from "../../products/hooks/useGetAllProducts";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { activeCart } = useActiveCart();
  const { setProductsInCart } = useProductCart();
  const { setElementsInCart } = useCartItems();

  const { addProductToCart, productsCart } = useAddProductToCart(
    setElementsInCart,
    activeCart
  );

  const { products } = useGetAllProducts();

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

    setProductsInCart(productsInCartToShow);
  }, [productsCart, products]);

  return (
    <div
      className="product-card_container"
      onClick={() => addProductToCart(product)}
    >
      <div className="product-card_image">
        <img
          src={`${HOST}/uploads/products/${product.image}`}
          alt="product-picture"
        />
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
