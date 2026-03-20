import { useState } from "react";
import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";

function useCreateCategory(setCategories, closeModal) {
  const [newCategoryInput, setNewCategoryInput] = useState({ name: "" });

  const handleChangeCreateCategory = (e) => {
    setNewCategoryInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    const createPromise = async () => {
      const { data } = await apiClient.post("/category", newCategoryInput);
      return data;
    };

    toast.promise(createPromise(), {
      loading: "Creando categoría...",
      success: (data) => {
        setCategories((prev) => [...prev, data]);
        closeModal();
        return "Categoría creada!";
      },
      error: "Error al crear la categoría",
    });
  };

  return { newCategoryInput, handleChangeCreateCategory, handleCreateCategory };
}

export default useCreateCategory;
