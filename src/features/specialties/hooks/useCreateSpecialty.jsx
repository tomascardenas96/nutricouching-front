import { toast } from "sonner";
import { useState } from "react";
import apiClient from "../../auth/api/apiClient";

function useCreateSpecialty(setSpecialties, closeModal) {
  const [newSpecialtyInput, setNewSpecialtyInput] = useState({
    name: "",
    categoryId: "",
  });

  const handleCreateSpecialty = async (e) => {
    e.preventDefault();
    const createSpecialty = async () => {
      const { data } = await apiClient.post("/specialty", newSpecialtyInput);

      return data;
    };

    toast.promise(createSpecialty(), {
      success: (data) => {
        setSpecialties((prev) => [{ ...data }, ...prev]);
        closeModal();
        return "Especialidad creada con exito!";
      },
      loading: "Creando especialidad...",
      error: "Error al crear una nueva especialidad",
    });
  };

  const handleChangeCreateSpecialty = (e) => {
    const { name, value } = e.target;
    setNewSpecialtyInput((prev) => ({ ...prev, [name]: value }));
  };

  return {
    handleCreateSpecialty,
    handleChangeCreateSpecialty,
    newSpecialtyInput,
  };
}

export default useCreateSpecialty;
