import { toast } from "sonner";
import { HOST } from "../../../api/data";

function useCreateProfessional(specialties, setProfessionals, closeModal) {
  const authToken = localStorage.getItem("authToken");

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
    const response = await fetch(`${HOST}/specialty/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(specialties),
    });
    const data = await response.json();

    if (data.error) {
      console.error(data);
      throw new Error(data.message);
    }

    return data;
  };

  const createSchedule = async (schedules, professionalId) => {
    const response = await fetch(`${HOST}/availability/${professionalId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(schedules),
    });
    const data = await response.json();

    if (data.error) {
      console.error(data);
      throw new Error(data.message);
    }

    return data;
  };

  const createProfessional = async (professional) => {
    const response = await fetch(`${HOST}/professional/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(professional),
    });
    const data = await response.json();

    if (data.error) {
      console.error(data);
      throw new Error(data.message);
    }

    return data;
  };

  return { handleSubmitCreateProfessional };
}

export default useCreateProfessional;
