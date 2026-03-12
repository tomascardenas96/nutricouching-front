import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";
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
      const { data } = await apiClient.delete(`/product/delete/${selectedProductId}`);
      return data;
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
      error: () => {
        return "Error eliminando el producto";
      },
    });
  };

  return { deleteProduct, isModalOpen, openModal, closeModal };
}

export default useDeleteProduct;
