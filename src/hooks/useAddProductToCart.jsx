import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUser } from "../context/UserProvider";
import useAddOneElementToCartWhenLoggedIn from "./useAddOneElementToCartWhenLoggedIn";

function useAddProductToCart(setElementsInCart, activeCart) {
  const { user } = useUser();

  const [productsCart, setProductsCart] = useState([]);
  const { handleAddOneElementToCart } = useAddOneElementToCartWhenLoggedIn(
    setElementsInCart,
    activeCart
  );

  // Función para agregar un producto al carrito (ya sea en localStorage o en el backend)
  const addProductToCart = async (product) => {
    if (!user) {
      // Recuperar los productos del carrito del localStorage
      const addedProducts = localStorage.getItem("products-cart");
      const parsedAddedProducts = addedProducts
        ? JSON.parse(addedProducts)
        : { products: [] };

      // Verificar si el producto ya está en el carrito
      const existentProductInCart = parsedAddedProducts?.products.find(
        (prod) => prod.productId === product.productId
      );

      if (existentProductInCart) {
        // Si el producto ya existe, aumentar su cantidad
        existentProductInCart.quantity += 1;
      } else {
        // Si el producto no existe, agregarlo al carrito con cantidad 1
        parsedAddedProducts.products.push({
          productId: product.productId,
          quantity: 1,
        });
      }

      // Guardar los productos actualizados en el localStorage
      localStorage.setItem(
        "products-cart",
        JSON.stringify(parsedAddedProducts)
      );

      // Actualizar el estado del carrito, lo que provocará un re-renderizado
      setProductsCart({ products: [...parsedAddedProducts.products] });
      toast.success("Producto agregado al carrito");
    } else {
      // Si hay un usuario logueado guardar directamente el producto en la DB.
      handleAddOneElementToCart(product);
    }
  };

  // useEffect para actualizar el estado del carrito cuando cambie el localStorage
  // Es necesario para que el carrito se actualice de acuerdo al local storage al recargar la página
  useEffect(() => {
    const addedProducts = localStorage.getItem("products-cart");
    const parsedAddedProducts = addedProducts
      ? JSON.parse(addedProducts)
      : { products: [] };

    setProductsCart({ products: [...parsedAddedProducts.products] });
  }, []); // Solo se ejecuta una vez al montar el componente

  return { addProductToCart, productsCart, setProductsCart };
}

export default useAddProductToCart;
