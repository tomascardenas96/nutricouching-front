import { toast } from "sonner";
import { HOST } from "../../../api/data";
import { useState } from "react";

function useDeleteProduct(setProducts) {
  const authToken = localStorage.getItem("authToken");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const openModal = (productId) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  const deleteProduct = async () => {
    const deleteProductPromise = async () => {
      const response = await fetch(
        `${HOST}/product/delete/${selectedProductId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        console.log("aca1")
        const errorData = await response.json();
        throw new Error(errorData.message || "Error deleting product"); 
      }

      return await response.json();
    };

    toast.promise(deleteProductPromise(), {
      loading: "Cargando...",
      success: () => {
        console.log("aca2")
        setProducts((prev) =>
          prev.filter((product) => product.productId !== selectedProductId)
        );
        setIsModalOpen(false);
        return "Producto eliminado";
      },
      error: () => {
        console.log("aca");
        return "Error eliminando el producto";
      },
    });
  };

  return { deleteProduct, isModalOpen, openModal, closeModal };
}

export default useDeleteProduct;
