import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";

function useCreateProfessional(specialties, setProfessionals, closeModal) {
  const handleSubmitCreateProfessional = async (e, userId, schedules) => {
    e.preventDefault();
    e.stopPropagation();

    // Creamos un nuevo profesional, haciendo fetching para crear las especialidades que no existan (en caso que el usuario root haya agregado nuevas), luego creamos un registro del profesional y por ultimo se le asignaran los horarios
    const createNewProfessional = async () => {
      const professional = {
        userId,
        specialties,
      };

      createSpecialtiesNonExistent(specialties)
        .then(() => {
          return createProfessional(professional);
        })
        .then((data) => {
          setProfessionals((prev) => [...prev, { ...data }]);
          return createSchedule(schedules, data.professionalId);
        })
        .catch((error) => {
          throw new Error(error);
        });
    };

    toast.promise(createNewProfessional(), {
      success: (data) => {
        closeModal();
        return "Profesional creado exitosamente";
      },
      loading: "Cargando...",
      error: "Error al crear un nuevo profesional",
    });
  };

  const createSpecialtiesNonExistent = async (specialties) => {
    const { data } = await apiClient.post("/specialty/list", specialties);
    return data;
  };

  const createSchedule = async (schedules, professionalId) => {
    const { data } = await apiClient.post(
      `/availability/${professionalId}`,
      schedules
    );
    return data;
  };

  const createProfessional = async (professional) => {
    const { data } = await apiClient.post("/professional/create", professional);
    return data;
  };

  return { handleSubmitCreateProfessional };
}

export default useCreateProfessional;
