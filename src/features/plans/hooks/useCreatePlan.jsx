import { useState } from "react";
import { toast } from "sonner";
import { HOST } from "../../../api/data";

function useCreatePlan(setPlans, handleAddPlanModal) {
  const [createPlanInput, setCreatePlanInput] = useState({
    title: "",
    description: "",
    shortDescription: "",
    price: "",
  });
  const [filePDF, setFilePDF] = useState(null);
  const [fileImage, setFileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleCreatePlan = async (e) => {
    e.preventDefault();

    const createPlan = async () => {
      const token = localStorage.getItem("authToken");
      const formData = new FormData();

      formData.append("title", createPlanInput.title);
      formData.append("description", createPlanInput.description);
      formData.append("shortDescription", createPlanInput.shortDescription);
      formData.append("price", createPlanInput.price);

      if (filePDF) {
        formData.append("pdf", filePDF);
      }
      if (fileImage) {
        formData.append("image", fileImage);
      }

      const response = await fetch(`${HOST}/plan`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        throw new Error();
      }

      return await response.json();
    };

    toast.promise(createPlan(), {
      loading: "Creando plan...",
      error: (error) => {
        return "Error al crear un nuevo plan";
      },
      success: (data) => {
        setPlans((prev) => {
          return {
            freePlans: prev.freePlans,
            notPurchasedPlans: [data, ...prev.notPurchasedPlans],
          };
        });
        handleAddPlanModal();
        return "Plan creado exitosamente!";
      },
    });
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setCreatePlanInput({ ...createPlanInput, [name]: value });
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
    handleCreatePlan,
    handleChangeInput,
    handleChangePdf,
    handleChangeImage,
    imagePreview,
    createPlanInput,
  };
}

export default useCreatePlan;
