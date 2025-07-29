import { useEffect, useState } from "react";
import { toast } from "sonner";
import { HOST } from "../../../api/data";

function useModifyPlan(selectedPlan, closeModifyPlanModal, setPlans) {
  const [modifyPlanInput, setModifyPlanInput] = useState({
    title: "",
    description: "",
    shortDescription: "",
    price: "",
    isOffer: false,
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (selectedPlan) {
      setModifyPlanInput({
        title: selectedPlan.title || "",
        description: selectedPlan.description || "",
        shortDescription: selectedPlan.shortDescription || "",
        price: selectedPlan.price || "",
        isOffer: selectedPlan.isOffer || false,
      });
    }
  }, [selectedPlan]);

  const handleModifyPlan = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    const formData = new FormData();
    if (modifyPlanInput.title) formData.append("title", modifyPlanInput.title);
    if (modifyPlanInput.description)
      formData.append("description", modifyPlanInput.description);
    if (modifyPlanInput.shortDescription)
      formData.append("shortDescription", modifyPlanInput.shortDescription);
    if (modifyPlanInput.price) formData.append("price", modifyPlanInput.price);
    if (modifyPlanInput.isOffer)
      formData.append("isOffer", modifyPlanInput.isOffer);
    if (image) formData.append("file", image);

    const modifyPlan = async () => {
      const response = await fetch(`${HOST}/plan/${selectedPlan.planId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error();
      }

      return await response.json();
    };

    toast.promise(modifyPlan(), {
      loading: "Modificando plan...",
      error: (error) => {
        return "Error al modificar un plan";
      },
      success: (data) => {
        setPlans((prev) => {
          return {
            freePlans: prev.freePlans.map((plan) =>
              plan.planId !== data.planId ? plan : data
            ),
            notPurchasedPlans: prev.notPurchasedPlans.map((plan) =>
              plan.planId !== data.planId ? plan : data
            ),
          };
        });
        closeModifyPlanModal();
        return "Plan modificado exitosamente!";
      },
    });
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setModifyPlanInput({ ...modifyPlanInput, [name]: value });
  };

  const handleChangeImage = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);

    if (selectedFile) {
      const imageURL = URL.createObjectURL(selectedFile);
      setImagePreview(imageURL);
    }
  };

  return {
    handleModifyPlan,
    modifyPlanInput,
    handleChangeInput,
    handleChangeImage,
    imagePreview,
  };
}

export default useModifyPlan;
