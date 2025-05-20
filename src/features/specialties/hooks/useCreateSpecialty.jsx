import { toast } from "sonner";
import { HOST } from "../../../api/data";
import { useState } from "react";

function useCreateSpecialty(setSpecialties, closeModal) {
  const authToken = localStorage.getItem("authToken");

  const [newSpecialtyInput, setNewSpecialtyInput] = useState({
    name: "",
    serviceId: "",
  });

  const handleCreateSpecialty = async (e) => {
    e.preventDefault();
    const createSpecialty = async () => {
      const response = await fetch(`${HOST}/specialty`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(newSpecialtyInput),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error();
      }

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
