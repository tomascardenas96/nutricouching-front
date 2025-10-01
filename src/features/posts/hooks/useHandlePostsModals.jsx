import { useState } from "react";

function useHandlePostsModals() {
  const [isDeletePostModalOpen, setIsDeletePostModalOpen] = useState(false);

  const handleOpenDeleteModal = () => {
    setIsDeletePostModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeletePostModalOpen(false);
  };

  return { handleOpenDeleteModal, handleCloseDeleteModal, isDeletePostModalOpen };
}

export default useHandlePostsModals;
