import { toast } from "sonner";
import { HOST } from "../api/data";
import { useState } from "react";

function useAssignSpecialtyToProfessional(
  setSpecialties,
  handleOpenCloseModal
) {
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState("");
  const assignSpecialtyToProfessional = async (
    e,
    specialtyId,
    professionalId
  ) => {
    e.preventDefault();
    const assignSpecialtyPromise = async () => {
      const response = await fetch(
        `${HOST}/specialty/${specialtyId}/professional/${professionalId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.json();

      if (!response.ok) {
        throw new Error();
      }

      return data;
    };

    toast.promise(assignSpecialtyPromise(), {
      success: (data) => {
        setSpecialties(data.specialty);
        handleOpenCloseModal();
        return "Especialidad asignada correctamente!";
      },
      loading: "Asignando especialidad...",
      error: "Error al asignar una especialidad",
    });
  };

  const handleChangeSelectSpecialty = (e) => {
    setSelectedSpecialtyId(e.target.value);
  };

  return {
    assignSpecialtyToProfessional,
    handleChangeSelectSpecialty,
    selectedSpecialtyId,
  };
}

export default useAssignSpecialtyToProfessional;
