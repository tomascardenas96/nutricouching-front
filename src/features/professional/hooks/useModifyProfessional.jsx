import { useEffect, useState } from "react";
import { toast } from "sonner";
import { HOST } from "../../../api/data";

function useModifyProfessional(
  selectedProfessional,
  setProfessionals,
  handleCloseModifyModal
) {
  const [modifyProfessionalInputs, setModifyProfessionalInputs] = useState({
    phone: "",
    role: "",
  });
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    if (selectedProfessional) {
      setModifyProfessionalInputs({
        file: selectedProfessional.file || "",
        phone: selectedProfessional.phone || "",
        role: selectedProfessional.role || "",
      });
      setImageSrc(
        `${HOST}/uploads/professionals/${selectedProfessional.image}`
      );
    }
  }, [selectedProfessional]);

  const handleSubmitModifyProfessional = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    const submit = async () => {
      const formData = new FormData();

      formData.append("phone", modifyProfessionalInputs.phone);
      formData.append("role", modifyProfessionalInputs.role);
      if (file) {
        formData.append("file", file);
      }

      const response = await fetch(
        `${HOST}/professional/update/${selectedProfessional.professionalId}`,
        {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      return await response.json();
    };

    toast.promise(submit(), {
      loading: "Modificando profesional...",
      success: (data) => {
        setProfessionals((prev) =>
          prev.map((professional) =>
            professional.professionalId === data.id
              ? {
                  ...professional,
                  phone: modifyProfessionalInputs.phone || professional.phone,
                  role: modifyProfessionalInputs.role || professional.role,
                  image: data.image || professional.image,
                }
              : professional
          )
        );
        handleCloseModifyModal();
        return "Profesional actualizado con exito!";
      },
      error: "Error al modificar el profesional",
    });
  };

  const handleChangeModifyProfessional = (e) => {
    const { name, value } = e.target;
    setModifyProfessionalInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeSelectedPicture = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setFile(null);
      setImageSrc(
        `${HOST}/uploads/professionals/${selectedProfessional.image}`
      );
      return;
    }

    setFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return {
    modifyProfessionalInputs,
    handleSubmitModifyProfessional,
    handleChangeModifyProfessional,
    handleChangeSelectedPicture,
    imageSrc,
  };
}

export default useModifyProfessional;
