import { useState } from "react";
import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";

function useUpdateProfileCover(onClose, setProfessionalProfile) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [noFileSelected, setNoFileSelected] = useState(
    "No se seleccionó ningún archivo"
  );

  const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file && file.size > MAX_SIZE) {
      toast.error("El archivo no puede superar los 5 MB");
      event.target.value = "";
      return;
    }

    setFile(file);

    if (file) {
      setFileName(file.name);
      setNoFileSelected("");
    } else {
      setFileName("");
      setNoFileSelected("No se seleccionó ningún archivo");
    }
  };

  const handleUpdateProfileCoverPhoto = async (e, profileId) => {
    e.preventDefault();

    const updateProfileCoverPhoto = async () => {
      if (!!noFileSelected) {
        throw new Error("Debe seleccionar una foto");
      }

      const formData = new FormData();
      formData.append("file", file);

      const { data } = await apiClient.patch(`/profile/cover/${profileId}`, formData);
      return data;
    };

    toast.promise(updateProfileCoverPhoto(), {
      loading: "Actualizando foto de portada...",
      error: (error) => {
        if (error?.response?.status === 413) return "El archivo es demasiado grande (máx. 5 MB)";
        return error?.response?.data?.message || error.message || "Error al actualizar la foto";
      },
      success: (data) => {
        setProfessionalProfile((prev) => {
          return { ...prev, coverPhoto: data.filename };
        });
        onClose();
        return "Foto de perfil actualizada!";
      },
    });
  };

  return {
    file,
    fileName,
    noFileSelected,
    handleFileChange,
    handleUpdateProfileCoverPhoto,
  };
}

export default useUpdateProfileCover;
