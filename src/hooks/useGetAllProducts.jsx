import { useEffect, useState } from "react";
import { HOST } from "../api/data";

function useGetAllProducts() {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isModifyProductModalOpen, setIsModifyProductModalOpen] =
    useState(false);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentProducts = products.slice(startIndex, endIndex);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(`${HOST}/product`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error getting products");
        }

        const data = await response.json();

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

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const previousPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const handleAddProductModal = () => {
    setIsAddProductModalOpen(!isAddProductModalOpen);
  };

  const handleModifyProductModal = () => {
    setIsModifyProductModalOpen(!isModifyProductModalOpen);
  };

  return {
    products,
    productsLoading,
    productsError,
    currentPage,
    currentProducts,
    nextPage,
    previousPage,
    totalPages,
    isAddProductModalOpen,
    isModifyProductModalOpen,
    handleAddProductModal,
    handleModifyProductModal,
    setProducts,
  };
}

export default useGetAllProducts;
