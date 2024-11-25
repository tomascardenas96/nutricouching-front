import { useState } from "react";
import { toast } from "sonner";
import { HOST } from "../api/data";

function useCreateViand(setViands, handleAddViandModal) {
  const [createViandInput, setCreateViandInput] = useState({
    name: "",
    description: "",
    stock: "",
    price: "",
  });
  const [fileCreateViand, setFileCreateViand] = useState(null);
  const [imagePreviewCreateViand, setImagePreviewCreateViand] = useState(null);

  const handleSubmitCreateViand = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", createViandInput.name);
    formData.append("description", createViandInput.description);
    formData.append("stock", createViandInput.stock);
    formData.append("price", createViandInput.price);

    if (fileCreateViand) {
      formData.append("file", fileCreateViand);
    }

    const createViand = async () => {
      const response = await fetch(`${HOST}/viand/create`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        throw new Error(data.message);
      }

      return data;
    };

    toast.promise(createViand(), {
      success: (data) => {
        setViands((prev) => [data, ...prev]);
        handleAddViandModal();
        return "Vianda creada exitosamente";
      },
      loading: "Cargando...",
      error: "Error al crear una nueva vianda",
    });
  };

  const handleChangeCreateViand = (e) => {
    const { name, value } = e.target;
    setCreateViandInput({ ...createViandInput, [name]: value });
  };

  const handleChangeCreateViandFile = (e) => {
    const selectedFile = e.target.files[0];
    setFileCreateViand(selectedFile);

    if (selectedFile) {
      const imgUrl = URL.createObjectURL(selectedFile);
      setImagePreviewCreateViand(imgUrl);
    }
  };

  return {
    handleSubmitCreateViand,
    handleChangeCreateViand,
    handleChangeCreateViandFile,
    createViandInput,
    fileCreateViand,
    imagePreviewCreateViand,
  };
}

export default useCreateViand;
