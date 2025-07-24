import { useState } from "react";

function useHandleProductsModals(setSelectedProduct) {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isModifyProductModalOpen, setIsModifyProductModalOpen] =
    useState(false);

  const handleAddProductModal = () => {
    setIsAddProductModalOpen(!isAddProductModalOpen);
  };

  const handleModifyProductModalOpen = (product) => {
    setSelectedProduct(product);
    setIsModifyProductModalOpen(true);
  };

  const handleModifyProductModalClose = () => {
    setSelectedProduct(null);
    setIsModifyProductModalOpen(false);
  };

  return {
    handleAddProductModal,
    handleModifyProductModalOpen,
    handleModifyProductModalClose,
    isAddProductModalOpen,
    isModifyProductModalOpen,
  };
}

export default useHandleProductsModals;
