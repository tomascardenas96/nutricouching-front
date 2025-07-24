import { useEffect, useState } from "react";
import { HOST } from "../../../api/data";

function useGetAllProducts() {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(`${HOST}/product`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error("Error getting products");
        }

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
