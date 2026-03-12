import { useEffect, useState } from "react";
import apiClient from "../../auth/api/apiClient";

function useGetLatestProducts() {
  const [latestProducts, setLatestProducts] = useState([]);
  const [latestProductsLoading, setLatestProductsLoading] = useState(true);
  const [latestProductsError, setLatestProductsError] = useState(false);

  useEffect(() => {
    const getLatestProducts = async () => {
      try {
        const { data } = await apiClient.get("/product/latest");
        setLatestProducts(data);
      } catch {
        setLatestProductsError(true);
      } finally {
        setLatestProductsLoading(false);
      }
    };

    getLatestProducts();
  }, []);

  return { latestProducts, latestProductsLoading, latestProductsError };
}

export default useGetLatestProducts;
