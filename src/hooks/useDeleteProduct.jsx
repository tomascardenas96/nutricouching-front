import { toast } from "sonner";
import { HOST } from "../api/data";
import { useState } from "react";

function useDeleteProduct(setProducts) {
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
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error creating product");
      }

      return await response.json();
    };

    toast.promise(deleteProductPromise(), {
      loading: "Cargando...",
      success: () => {
        setProducts((prev) =>
          prev.filter((product) => product.productId !== selectedProductId)
        );
        setIsModalOpen(false);
        return "Producto eliminado";
      },
      error: "Error eliminando el producto",
    });
  };

  return { deleteProduct, isModalOpen, openModal, closeModal };
}

export default useDeleteProduct;
