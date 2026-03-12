import { useEffect, useState } from "react";
import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";

function useModifySpecialty(
  selectedSpecialty,
  setSpecialties,
  handleCloseModifyModal
) {
  const [modifySpecialtyInput, setModifySpecialtyInput] = useState({
    name: "",
    categoryId: "",
  });

  useEffect(() => {
    if (selectedSpecialty) {
      setModifySpecialtyInput({
        name: selectedSpecialty.name || "",
        categoryId: selectedSpecialty.category?.categoryId || "",
      });
    }
  }, [selectedSpecialty]);

  const handleSubmitModifySpecialty = async (e) => {
    e.preventDefault();
    const submit = async () => {
      const { data } = await apiClient.patch(
        `/specialty/${selectedSpecialty.specialtyId}`,
        modifySpecialtyInput
      );

      return data;
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
                  category: data.category || specialty.category,
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
