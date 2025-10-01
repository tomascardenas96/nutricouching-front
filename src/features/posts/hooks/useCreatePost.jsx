import { useRef, useState } from "react";
import { toast } from "sonner";
import { HOST } from "../../../api/data";

function useCreatePost(profileId, setPosts) {
  const fileInputRef = useRef(null);
  const [postInput, setPostInput] = useState("");
  const [postSelectedImage, setPostSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const createPost = async (e) => {
    e.preventDefault();

    if (postInput.trim() === "") {
      return;
    }

    async function createPostPromise() {
      const formData = new FormData();

      formData.append("body", postInput);
      formData.append("profileId", profileId);

      if (postSelectedImage) {
        formData.append("file", postSelectedImage);
      }

      const token = localStorage.getItem("authToken");
      const response = await fetch(`${HOST}/post`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error();

      return await response.json();
    }

    toast.promise(createPostPromise(), {
      loading: "Creando publicacion...",
      success: (data) => {
        handleUnselectImage();
        setPostSelectedImage(null);
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

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    setPostSelectedImage(file);

    if (file) {
      const fileURL = URL.createObjectURL(file);
      setImagePreview(fileURL);
    } else {
      setPostSelectedImage(null);
      setImagePreview(null);
    }
  };

  const handleUnselectImage = () => {
    setImagePreview(null);
    setPostSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEnterKeyDown = (e) => {
    //Permitir salto de linea presionando SHIFT + ENTER
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      createPost(e);
    }
  };

  return {
    createPost,
    postInput,
    handleChangePostInput,
    handleEnterKeyDown,
    handleSelectImage,
    postSelectedImage,
    imagePreview,
    handleUnselectImage,
    fileInputRef,
  };
}

export default useCreatePost;
