import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUser } from "../context/UserProvider";

function useAddProductToCart() {
  const { user } = useUser();
  const [cart,  setCart] = useState([]);

  // Función para agregar un producto al carrito
  const addProductToCart = async (product) => {
    const addProductPromise = () => {
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
        setCart(parsedAddedProducts.products);
        toast.success("Producto agregado al carrito");
      } else {
        // Aquí podrías manejar el caso cuando el usuario está logueado, usando una API
        // para agregar el producto al carrito del backend.
        console.log("Usuario logueado, agregar al carrito en el backend");
      }
    };

    // toast.promise(addProductPromise(), {
    //   loading: "Agregando producto al carrito...",
    //   success: "Producto agregado al carrito",
    //   error: "Ocurrió un error al agregar el producto al carrito",
    // });

    addProductPromise();
  };

  // useEffect para actualizar el estado del carrito cuando cambie el localStorage
  useEffect(() => {
    const addedProducts = localStorage.getItem("products-cart");
    const parsedAddedProducts = addedProducts
      ? JSON.parse(addedProducts)
      : { products: [] };
    setCart(parsedAddedProducts.products); // Sincronizar el estado con el carrito del localStorage
  }, []); // Solo se ejecuta una vez al montar el componente

  return { addProductToCart, cart, setCart };
}

export default useAddProductToCart;
