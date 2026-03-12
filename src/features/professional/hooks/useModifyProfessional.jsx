import { useEffect, useState } from "react";
import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";

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
        phone: selectedProfessional.phone || null,
        role: selectedProfessional.role || null,
      });
    }
  }, [selectedProfessional]);

  const handleSubmitModifyProfessional = async (e) => {
    e.preventDefault();

    const submit = async () => {
      const { data } = await apiClient.patch(
        `/professional/update/${selectedProfessional.professionalId}`,
        modifyProfessionalInputs
      );
      return data;
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
                }
              : professional
          )
        );
        handleCloseModifyModal();
        return "Profesional actualizado con exito!";
      },
      error: (error) => {
        return "Error al modificar el profesional";
      },
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
