import { useActiveCart } from "../../cart/hooks/useActiveCart";
import useAddViandToCart from "../../cart/hooks/useAddViandToCart";
import { useCartItems } from "../../cart/hooks/useCartItems";
import { useViandsCart } from "../../cart/hooks/useViandsCart";
import ProductsCarousel from "../../products/components/ProductsCarousel";
import useGetAllViands from "../hooks/useGetAllViands";

function Viands() {
  const { viands, viandsLoading, viandsError } = useGetAllViands();

  const { activeCart } = useActiveCart();
  const { setViandsInCart } = useViandsCart();
  const { setElementsInCart, elementsInCart } = useCartItems();

  const { addViandToCart, viandsCart } = useAddViandToCart(
    setElementsInCart,
    activeCart
  );

  return (
    <ProductsCarousel
      products={viands}
      productsError={viandsError}
      productsLoading={viandsLoading}
      addProductToCart={addViandToCart}
      productsCart={viandsCart}
      setProductsInCart={setViandsInCart}
    />
  );
}

export default Viands;
