import React from "react";
import { useActiveCart } from "../../cart/hooks/useActiveCart";
import useAddProductToCart from "../../cart/hooks/useAddProductToCart";
import { useCartItems } from "../../cart/hooks/useCartItems";
import { useProductCart } from "../../cart/hooks/useProductsCart";
import useGetAllProducts from "../hooks/useGetAllProducts";
import "./Products.css";
import ProductsCarousel from "./ProductsCarousel";

function Products() {
  const { products, productsError, productsLoading } = useGetAllProducts();

  const { activeCart } = useActiveCart();
  const { setProductsInCart } = useProductCart();
  const { setElementsInCart } = useCartItems();

  const { addProductToCart, productsCart } = useAddProductToCart(
    setElementsInCart,
    activeCart
  );

  return (
    <div className="products-section_container">
      <div className="products-container">
        <ProductsCarousel
          products={products}
          productsError={productsError}
          productsLoading={productsLoading}
          addProductToCart={addProductToCart}
          productsCart={productsCart}
          setProductsInCart={setProductsInCart}
        />
      </div>
    </div>
  );
}

export default Products;
