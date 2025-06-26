import { useState } from "react";
import { toast } from "sonner";
import { HOST } from "../../../api/data";

function useCreatePost(profileId, setPosts) {
  const [postInput, setPostInput] = useState("");

  const createPost = async (e) => {
    e.preventDefault();

    async function createPostPromise() {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${HOST}/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ body: postInput, profileId }),
      });

      if (!response.ok) throw new Error();

      return await response.json();
    }

    toast.promise(createPostPromise(), {
      loading: "Creando publicacion...",
      success: (data) => {
        setPostInput("");
        setPosts((prev) => [{ ...data }, ...prev]);
        return "Publicacion creado exitosamente!";
      },
      error: "Error al crear la publicacion",
    });
  };

  const handleChangePostInput = (e) => {
    const value = e.target.value.trimStart();
    setPostInput(value);
  };

  return { createPost, postInput, handleChangePostInput };
}

export default useCreatePost;
