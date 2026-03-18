import { useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../auth/api/apiClient";

function useGetAllProducts() {
  const queryClient = useQueryClient();

  const {
    data: products = [],
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => apiClient.get("/product").then((r) => r.data),
  });

  const setProducts = (updater) =>
    queryClient.setQueryData(["products"], updater);

  return { products, productsLoading, productsError, setProducts };
}

export default useGetAllProducts;
