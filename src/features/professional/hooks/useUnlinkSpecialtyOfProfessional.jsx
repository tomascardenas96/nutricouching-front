import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";

function useUnlinkSpecialtyOfProfessional(setSpecialties) {
  const handleUnlinkSpecialtyOfProfessional = async (
    specialtyId,
    professionalId
  ) => {
    const unlinkSpecialtyPromise = async () => {
      const { data } = await apiClient.patch(
        `/specialty/unlink/${specialtyId}/professional/${professionalId}`
      );
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
