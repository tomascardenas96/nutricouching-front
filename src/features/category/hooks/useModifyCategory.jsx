import { useState } from "react";
import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";

function useModifyCategory(setCategories, closeModal, selectedCategory) {
  const [modifyCategoryInput, setModifyCategoryInput] = useState({
    name: selectedCategory?.name || "",
  });

  const handleChangeModifyCategory = (e) => {
    setModifyCategoryInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleModifyCategory = async (e) => {
    e.preventDefault();

    const modifyPromise = async () => {
      const { data } = await apiClient.patch(
        `/category/${selectedCategory.categoryId}`,
        modifyCategoryInput
      );
      return data;
    };

    toast.promise(modifyPromise(), {
      loading: "Modificando categoría...",
      success: (data) => {
        setCategories((prev) =>
          prev.map((c) => (c.categoryId === data.categoryId ? data : c))
        );
        closeModal();
        return "Categoría modificada!";
      },
      error: "Error al modificar la categoría",
    });
  };

  return { modifyCategoryInput, handleChangeModifyCategory, handleModifyCategory };
}

export default useModifyCategory;
