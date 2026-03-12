import { useEffect, useState } from "react";
import apiClient from "../../auth/api/apiClient";

function useGetAllProducts() {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await apiClient.get("/product");
        setProducts(data);
      } catch (error) {
        console.error(error);
        setProductsError(true);
      } finally {
        setProductsLoading(false);
      }
    };

    getProducts();
  }, [setProducts]);

  return {
    products,
    productsLoading,
    productsError,
    setProducts,
  };
}

export default useGetAllProducts;
