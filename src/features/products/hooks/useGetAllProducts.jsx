import { useEffect, useState } from "react";
import { HOST } from "../../../api/data";

function useGetAllProducts() {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(false);

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isModifyProductModalOpen, setIsModifyProductModalOpen] =
    useState(false);

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

  const handleAddProductModal = () => {
    setIsAddProductModalOpen(!isAddProductModalOpen);
  };

  return {
    products,
    productsLoading,
    productsError,
    isAddProductModalOpen,
    isModifyProductModalOpen,
    handleAddProductModal,
    setProducts,
  };
}

export default useGetAllProducts;
