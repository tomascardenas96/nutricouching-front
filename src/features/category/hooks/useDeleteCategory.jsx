import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";

function useDeleteCategory(setCategories, closeModal) {
  const handleDeleteCategory = async (categoryId) => {
    const deletePromise = async () => {
      const { data } = await apiClient.delete(`/category/${categoryId}`);
      return data;
    };

    toast.promise(deletePromise(), {
      loading: "Eliminando categoría...",
      success: () => {
        setCategories((prev) => prev.filter((c) => c.categoryId !== categoryId));
        closeModal();
        return "Categoría eliminada!";
      },
      error: "Error al eliminar la categoría",
    });
  };

  return { handleDeleteCategory };
}

export default useDeleteCategory;
