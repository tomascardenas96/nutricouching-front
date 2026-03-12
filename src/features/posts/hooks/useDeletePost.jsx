import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";

function useDeletePost(setPosts, handleCloseDeleteModal) {
  const handleDeletePost = async (id) => {
    const deletePostPromise = async () => {
      await apiClient.delete(`/post/${id}`);
    };

    toast.promise(deletePostPromise(), {
      loading: "Eliminando un post...",
      success: () => {
        setPosts((prev) => prev.filter((post) => post.postId !== id));
        handleCloseDeleteModal();
        return "Post eliminado exitosamente!";
      },
      error: "Error al eliminar un post",
    });
  };

  return { handleDeletePost };
}

export default useDeletePost;
