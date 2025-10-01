import { toast } from "sonner";
import { HOST } from "../../../api/data";

function useDeletePost(setPosts, handleCloseDeleteModal) {
  const handleDeletePost = async (id) => {
    const token = localStorage.getItem("authToken");
    const deletePostPromise = async () => {
      const response = await fetch(`${HOST}/post/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error();
      }

      return;
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
