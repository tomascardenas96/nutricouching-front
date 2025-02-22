import React, { useState } from "react";
import { HOST } from "../api/data";
import { toast } from "sonner";

function useCreateProduct(setProducts, handleAddProductModal) {
  const authToken = localStorage.getItem("authToken");

  const [createProductInput, setCreateProductInput] = useState({
    name: "",
    description: "",
    stock: "",
    price: "",
  });
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmitCreateProduct = async (e) => {
    e.preventDefault();

    const createProduct = async () => {
      const formData = new FormData();

      formData.append("name", createProductInput.name);
      formData.append("description", createProductInput.description);
      formData.append("stock", createProductInput.stock);
      formData.append("price", createProductInput.price);

      if (file) {
        formData.append("file", file);
      }

      const response = await fetch(`${HOST}/product`, {
        method: "POST",
        headers: { Authorization: `Bearer ${authToken}` },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error creating product");
      }

      return await response.json();
    };

    toast.promise(createProduct(), {
      loading: "Cargando...",
      success: (data) => {
        setProducts((prev) => [{ ...data }, ...prev]);
        handleAddProductModal();
        return "Producto creado exitosamente!";
      },
      error: "Error al crear un nuevo producto",
    });
  };

  const handleChangeCreateProduct = (e) => {
    const { name, value } = e.target;
    setCreateProductInput({ ...createProductInput, [name]: value });
  };

  const handleChangeCreateProductPicture = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile);
      setImagePreview(fileURL);
    }
  };

  return {
    handleSubmitCreateProduct,
    handleChangeCreateProduct,
    createProductInput,
    handleChangeCreateProductPicture,
    file,
    imagePreview,
  };
}

export default useCreateProduct;
