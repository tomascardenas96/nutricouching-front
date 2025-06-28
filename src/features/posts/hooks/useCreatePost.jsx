import { useState } from "react";
import { toast } from "sonner";
import { HOST } from "../../../api/data";

function useCreatePost(profileId, setPosts) {
  const [postInput, setPostInput] = useState("");

  const createPost = async (e) => {
    e.preventDefault();

    if (postInput.trim() === "") {
      return;
    }

    setPostInput("");

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

  const handleEnterKeyDown = (e) => {
    //Permitir salto de linea presionando SHIFT + ENTER
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      createPost(e);
    }
  };

  return { createPost, postInput, handleChangePostInput, handleEnterKeyDown };
}

export default useCreatePost;
