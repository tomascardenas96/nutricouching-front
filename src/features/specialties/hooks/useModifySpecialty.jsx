import { useEffect, useState } from "react";
import { toast } from "sonner";
import { HOST } from "../../../api/data";

function useModifySpecialty(
  selectedSpecialty,
  setSpecialties,
  handleCloseModifyModal
) {
  const [modifySpecialtyInput, setModifySpecialtyInput] = useState({
    name: "",
    serviceId: "",
  });

  useEffect(() => {
    if (selectedSpecialty) {
      setModifySpecialtyInput({
        name: selectedSpecialty.name || "",
        serviceId: selectedSpecialty.service?.serviceId || "",
      });
    }
  }, [selectedSpecialty]);

  const handleSubmitModifySpecialty = async (e) => {
    const token = localStorage.getItem("authToken");
    e.preventDefault();
    const submit = async () => {
      const response = await fetch(
        `${HOST}/specialty/${selectedSpecialty.specialtyId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(modifySpecialtyInput),
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      return await response.json();
    };

    toast.promise(submit(), {
      loading: "Modificando especialidad...",
      success: (data) => {
        handleCloseModifyModal();
        setSpecialties((prev) =>
          prev.map((specialty) => {
            return specialty.specialtyId === selectedSpecialty.specialtyId
              ? {
                  ...specialty,
                  name: data.name || specialty.name,
                  service: data.service || specialty.service,
                }
              : specialty;
          })
        );
        return "Especialidad modificada!";
      },
      error: "Error modificando especialidad",
    });
  };

  const handleChangeModifySpecialty = (e) => {
    const { name, value } = e.target;
    setModifySpecialtyInput((prev) => ({ ...prev, [name]: value }));
  };

  return {
    modifySpecialtyInput,
    handleChangeModifySpecialty,
    handleSubmitModifySpecialty,
  };
}

export default useModifySpecialty;
