import { useState } from "react";
import { toast } from "sonner";
import { HOST } from "../../../api/data";

function useCreateViand(setViands, handleAddViandModal) {
  const authToken = localStorage.getItem("authToken");

  const [createViandInput, setCreateViandInput] = useState({
    name: "",
    description: "",
    stock: "",
    price: "",
    ingredients: [],
  });
  const [fileCreateViand, setFileCreateViand] = useState(null);
  const [imagePreviewCreateViand, setImagePreviewCreateViand] = useState(null);

  const handleChangeCreateViand = (e) => {
    const { name, value } = e.target;
    setCreateViandInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeCreateViandFile = (e) => {
    const file = e.target.files[0];
    setFileCreateViand(file);
    setImagePreviewCreateViand(file ? URL.createObjectURL(file) : null);
  };

  const addIngredient = () => {
    setCreateViandInput((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { id: Date.now(), name: "" }],
    }));
  };

  const updateIngredient = (id, field, value) => {
    setCreateViandInput((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ing) =>
        ing.id === id ? { ...ing, [field]: value } : ing
      ),
    }));
  };

  const removeIngredient = (id) => {
    setCreateViandInput((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((ing) => ing.id !== id),
    }));
  };

  const handleSubmitCreateViand = async (e) => {
    e.preventDefault();

    const createViand = async () => {
      const formData = new FormData();
      formData.append("name", createViandInput.name);
      formData.append("description", createViandInput.description);
      formData.append("stock", createViandInput.stock);
      formData.append("price", createViandInput.price);
      formData.append(
        "ingredients",
        JSON.stringify(createViandInput.ingredients)
      );
      if (fileCreateViand) formData.append("file", fileCreateViand);

      const res = await fetch(`${HOST}/viand/create`, {
        method: "POST",
        headers: { Authorization: `Bearer ${authToken}` },
        body: formData,
      });

      if (!res.ok) {
        throw new Error();
      }

      return await res.json();
    };

    toast.promise(createViand(), {
      loading: "Creando vianda...",
      error: (error) => {
        console.log(error);
        return "Error al crear una vianda";
      },
      success: (data) => {
        setViands((prev) => [data, ...prev]);
        handleAddViandModal();
        return "Vianda creada exitosamente!";
      },
    });
  };

  return {
    handleSubmitCreateViand,
    handleChangeCreateViand,
    handleChangeCreateViandFile,
    createViandInput,
    fileCreateViand,
    imagePreviewCreateViand,
    addIngredient,
    updateIngredient,
    removeIngredient,
  };
}

export default useCreateViand;
