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

  useEffect(() => {
    if (selectedProfessional) {
      setModifyProfessionalInputs({
        file: selectedProfessional.file || "",
        phone: selectedProfessional.phone || "",
        role: selectedProfessional.role || "",
      });
    }
  }, [selectedProfessional]);

  const handleSubmitModifyProfessional = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    const submit = async () => {
      const formData = new FormData();

      formData.append("phone", modifyProfessionalInputs.phone);
      formData.append("role", modifyProfessionalInputs.role);

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

  return {
    modifyProfessionalInputs,
    handleSubmitModifyProfessional,
    handleChangeModifyProfessional,
  };
}

export default useModifyProfessional;
