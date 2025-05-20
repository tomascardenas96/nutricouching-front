import React, { useState } from "react";
import { toast } from "sonner";
import { HOST } from "../../../api/data";

function useModifyViand(selectedViand, handleModifyViandModal, setViands) {
  const authToken = localStorage.getItem("authToken");

  const [modifyViandInput, setModifyViandInput] = useState(selectedViand);
  const [fileModifyViand, setFileModifyViand] = useState(null);
  const [imagePreviewModifyViand, setImagePreviewModifyViand] = useState(null);

  const handleSubmitModifyViand = (e) => {
    e.preventDefault();

    const modifyViand = async () => {
      const formData = new FormData();

      formData.append("name", modifyViandInput.name);
      formData.append("description", modifyViandInput.description);
      formData.append("price", modifyViandInput.price);
      formData.append("stock", modifyViandInput.stock);

      if (fileModifyViand) {
        formData.append("file", fileModifyViand);
      }

      const response = await fetch(
        `${HOST}/viand/update/${selectedViand.viandId}`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${authToken}` },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        throw new Error(data.message);
      }

      return data;
    };

    toast.promise(modifyViand(), {
      success: (data) => {
        setViands((prev) =>
          prev.map((viand) =>
            viand.viandId === selectedViand.viandId
              ? { ...viand, ...modifyViandInput, image: data.image }
              : viand
          )
        );
        handleModifyViandModal();
        return "Vianda modificada exitosamente";
      },
      loading: "Cargando...",
      error: "Error al modificar la vianda",
    });
  };

  const handleChangeModifyViand = (e) => {
    const { name, value } = e.target;
    setModifyViandInput({ ...modifyViandInput, [name]: value });
  };

  const handleChangeModifyViandFile = (e) => {
    const selectedFile = e.target.files[0];
    setFileModifyViand(selectedFile);

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setImagePreviewModifyViand(imageUrl);
    }
  };

  return {
    handleSubmitModifyViand,
    handleChangeModifyViand,
    handleChangeModifyViandFile,
    imagePreviewModifyViand,
    fileModifyViand,
    modifyViandInput,
  };
}

export default useModifyViand;
