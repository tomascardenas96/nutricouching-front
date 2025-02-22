import React from "react";
import { toast } from "sonner";
import { HOST } from "../api/data";

function useUnlinkSpecialtyOfProfessional(setSpecialties) {
  const authToken = localStorage.getItem("authToken");

  const handleUnlinkSpecialtyOfProfessional = async (
    specialtyId,
    professionalId
  ) => {
    const unlinkSpecialtyPromise = async () => {
      const response = await fetch(
        `${HOST}/specialty/unlink/${specialtyId}/professional/${professionalId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error();

      return data;
    };

    toast.promise(unlinkSpecialtyPromise(), {
      success: (data) => {
        setSpecialties(data.specialty);
        return "Especialidad desvinculada!";
      },
      loading: "Desvinculando especialidad...",
      error: "Error al desvincular una especialidad",
    });
  };

  return { handleUnlinkSpecialtyOfProfessional };
}

export default useUnlinkSpecialtyOfProfessional;
