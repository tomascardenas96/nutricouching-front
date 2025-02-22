import { useState } from "react";
import { toast } from "sonner";
import { HOST } from "../api/data";

function useModifyService(
  selectedService,
  handleModifyServiceModal,
  setServices
) {
  const authToken = localStorage.getItem("authToken");

  const [modifyServiceInput, setModifyServiceInput] = useState(selectedService);
  const [fileModifyService, setFileModifyService] = useState(null);
  const [imagePreviewModifyService, setImagePreviewModifyService] =
    useState(null);

  const handleSubmitModifyService = (e) => {
    e.preventDefault();

    const modifyService = async () => {
      const formData = new FormData();

      formData.append("title", modifyServiceInput.title);
      formData.append("description", modifyServiceInput.description);
      formData.append("price", modifyServiceInput.price);

      if (fileModifyService) {
        formData.append("file", fileModifyService);
      }

      const response = await fetch(
        `${HOST}/service/update/${selectedService.serviceId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const responseError = await response.json();
        throw new Error(responseError.message);
      }

      return await response.json();
    };

    toast.promise(modifyService(), {
      success: (data) => {
        setServices((prev) =>
          prev.map((service) => {
            if (service.serviceId === selectedService.serviceId)
              return {
                ...service,
                ...modifyServiceInput,
                image: data.image,
              };
            return service;
          })
        );
        handleModifyServiceModal();
        return "Servicio modificado exitosamente";
      },
      loading: "Cargando...",
      error: "Error modificando el servicio",
    });
  };

  const handleChangeModifyService = (e) => {
    const { name, value } = e.target;
    setModifyServiceInput({ ...modifyServiceInput, [name]: value });
  };

  const handleChangeSelectedFile = (e) => {
    const selectedModifyServiceFile = e.target.files[0];
    setFileModifyService(selectedModifyServiceFile);

    if (selectedModifyServiceFile) {
      const fileURL = URL.createObjectURL(selectedModifyServiceFile);
      setImagePreviewModifyService(fileURL);
    }
  };

  return {
    handleSubmitModifyService,
    handleChangeModifyService,
    handleChangeSelectedFile,
    imagePreviewModifyService,
    modifyServiceInput,
    fileModifyService,
  };
}

export default useModifyService;
