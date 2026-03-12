import { toast } from "sonner";
import { useState } from "react";
import apiClient from "../../auth/api/apiClient";

function useAssignSpecialtyToProfessional(setSpecialties, onClose) {
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState("");

  const assignSpecialtyToProfessional = async (
    e,
    specialtyId,
    professionalId
  ) => {
    e.preventDefault();
    const assignSpecialtyPromise = async () => {
      const { data } = await apiClient.post(
        `/specialty/${specialtyId}/professional/${professionalId}`
      );

      return data;
    };

    toast.promise(assignSpecialtyPromise(), {
      success: (data) => {
        setSpecialties(data.specialty);
        onClose();
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
