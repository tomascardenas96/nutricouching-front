import { useState } from "react";

function useCategoryModals(selectCategory) {
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isModifyCategoryModalOpen, setIsModifyCategoryModalOpen] = useState(false);
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] = useState(false);

  const handleAddCategoryModal = () => {
    setIsAddCategoryModalOpen((prev) => !prev);
  };

  const handleOpenModifyModal = (category) => {
    selectCategory(category);
    setIsModifyCategoryModalOpen(true);
  };

  const handleCloseModifyModal = () => {
    setIsModifyCategoryModalOpen(false);
  };

  const handleOpenDeleteModal = (category) => {
    selectCategory(category);
    setIsDeleteCategoryModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteCategoryModalOpen(false);
  };

  return {
    isAddCategoryModalOpen,
    handleAddCategoryModal,
    isModifyCategoryModalOpen,
    handleOpenModifyModal,
    handleCloseModifyModal,
    isDeleteCategoryModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  };
}

export default useCategoryModals;
