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
        phone: selectedProfessional.phone || null,
        role: selectedProfessional.role || null,
      });
    }
  }, [selectedProfessional]);

  const handleSubmitModifyProfessional = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    const submit = async () => {
      const response = await fetch(
        `${HOST}/professional/update/${selectedProfessional.professionalId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(modifyProfessionalInputs),
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
