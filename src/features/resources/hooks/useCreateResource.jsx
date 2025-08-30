import { useState } from "react";
import { toast } from "sonner";
import { HOST } from "../../../api/data";

function useCreateResourse(setResources, handleAddResourceModal) {
  const [createResourceInput, setCreateResourceInput] = useState({
    title: "",
    description: "",
    shortDescription: "",
    price: "",
  });
  const [filePDF, setFilePDF] = useState(null);
  const [fileImage, setFileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleCreateResource = async (e) => {
    e.preventDefault();

    const createResource = async () => {
      const token = localStorage.getItem("authToken");
      const formData = new FormData();

      formData.append("title", createResourceInput.title);
      formData.append("description", createResourceInput.description);
      formData.append("shortDescription", createResourceInput.shortDescription);
      formData.append("price", createResourceInput.price);

      if (filePDF) {
        formData.append("pdf", filePDF);
      }
      if (fileImage) {
        formData.append("image", fileImage);
      }

      const response = await fetch(`${HOST}/resource`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        throw new Error();
      }

      return await response.json();
    };

    toast.promise(createResource(), {
      loading: "Creando recurso descargable...",
      error: (error) => {
        return "Error al crean un nuevo recurso";
      },
      success: (data) => {
        setResources((prev) => {
          return {
            freePlans: prev.freePlans,
            notPurchasedPlans: [data, ...prev.notPurchasedPlans],
          };
        });
        handleAddResourceModal();
        return "Recurso creado exitosamente!";
      },
    });
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setCreateResourceInput({ ...createResourceInput, [name]: value });
  };

  const handleChangePdf = (e) => {
    const selectedFile = e.target.files[0];
    setFilePDF(selectedFile);
  };

  const handleChangeImage = (e) => {
    const selectedFile = e.target.files[0];
    setFileImage(selectedFile);

    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile);
      setImagePreview(fileURL);
    }
  };

  return {
    handleCreateResource,
    handleChangeInput,
    handleChangePdf,
    handleChangeImage,
    imagePreview,
    createResourceInput,
  };
}

export default useCreateResourse;
