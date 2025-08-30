import { useEffect, useState } from "react";
import { toast } from "sonner";
import { HOST } from "../../../api/data";

function useModifyResource(
  selectedResource,
  closeModifyResourceModal,
  setResources
) {
  const [modifyResourceInput, setModifyResourceInput] = useState({
    title: "",
    description: "",
    shortDescription: "",
    price: "",
    isOffer: false,
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (selectedResource) {
      setModifyResourceInput({
        title: selectedResource.title || "",
        description: selectedResource.description || "",
        shortDescription: selectedResource.shortDescription || "",
        price: selectedResource.price || "",
        isOffer: selectedResource.isOffer || false,
      });
    }
  }, [selectedResource]);

  const handleModifyResource = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    const formData = new FormData();
    if (modifyResourceInput.title)
      formData.append("title", modifyResourceInput.title);
    if (modifyResourceInput.description)
      formData.append("description", modifyResourceInput.description);
    if (modifyResourceInput.shortDescription)
      formData.append("shortDescription", modifyResourceInput.shortDescription);
    if (modifyResourceInput.price)
      formData.append("price", modifyResourceInput.price);
    if (modifyResourceInput.isOffer)
      formData.append("isOffer", modifyResourceInput.isOffer);
    if (image) formData.append("file", image);

    const modifyResource = async () => {
      const response = await fetch(
        `${HOST}/resource/${selectedResource.resourceId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      return await response.json();
    };

    toast.promise(modifyResource(), {
      loading: "Modificando recurso...",
      error: (error) => {
        return "Error al modificar un recurso";
      },
      success: (data) => {
        setResources((prev) => {
          return {
            freePlans: prev.freePlans.map((res) =>
              res.resourceId !== data.resourceId ? res : data
            ),
            notPurchasedPlans: prev.notPurchasedPlans.map((res) =>
              res.resourceId !== data.resourceId ? res : data
            ),
            purchasedPlans: prev.purchasedPlans.map((res) =>
              res.resourceId !== data.resourceId ? res : data
            ),
          };
        });
        closeModifyResourceModal();
        return "Recurso modificado exitosamente!";
      },
    });
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setModifyResourceInput({ ...modifyResourceInput, [name]: value });
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
    handleModifyResource,
    modifyResourceInput,
    handleChangeInput,
    handleChangeImage,
    imagePreview,
  };
}

export default useModifyResource;
