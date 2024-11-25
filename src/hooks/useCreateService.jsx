import React, { useState } from "react";
import { HOST } from "../api/data";
import { toast } from "sonner";

function useCreateService(handleAddServiceModal, setServices) {
  const [createServiceInput, setCreateServiceInput] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [fileCreateService, setFileCreateService] = useState(null);
  const [imagePreviewCreateService, setImagePreviewCreateService] =
    useState(null);

  const handleSubmitCreateService = async (e) => {
    e.preventDefault();

    const createService = async () => {
      const formData = new FormData();

      formData.append("title", createServiceInput.title);
      formData.append("description", createServiceInput.description);
      formData.append("price", createServiceInput.price);

      if (fileCreateService) {
        formData.append("file", fileCreateService);
      }

      const response = await fetch(`${HOST}/service/create`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    };

    toast.promise(createService(), {
      success: (data) => {
        setServices((prev) => [{ ...data }, ...prev]);
        handleAddServiceModal();
        return "Servicio creado exitosamente";
      },
      loading: "Cargando...",
      error: "Error creando un nuevo servicio",
    });
  };

  const handleChangeCreateService = (e) => {
    const { name, value } = e.target;
    setCreateServiceInput({ ...createServiceInput, [name]: value });
  };

  const handleChangeCreateProductFile = (e) => {
    const selectedFile = e.target.files[0];
    setFileCreateService(selectedFile);

    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile);
      setImagePreviewCreateService(fileURL);
    }
  };

  return {
    handleChangeCreateService,
    handleSubmitCreateService,
    createServiceInput,
    fileCreateService,
    imagePreviewCreateService,
    handleChangeCreateProductFile,
  };
}

export default useCreateService;
