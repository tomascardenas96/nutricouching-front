import { useState } from "react";
import { toast } from "sonner";
import { HOST } from "../../../api/data";

function useUpdateProfilePhoto(onClose, setProfessionalProfile) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [noFileSelected, setNoFileSelected] = useState(
    "No se seleccionó ningún archivo"
  );

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    setFile(file);

    if (file) {
      setFileName(file.name);
      setNoFileSelected("");
    } else {
      setFileName("");
      setNoFileSelected("No se seleccionó ningún archivo");
    }
  };

  const handleUpdateProfilePhoto = async (e, profileId) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    const updateProfilePhoto = async () => {
      if (!!noFileSelected) {
        throw new Error("Debe seleccionar una foto");
      }

      if (!token) {
        throw new Error("Token Invalido");
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${HOST}/profile/photo/${profileId}`, {
        method: "PATCH",
        headers: { authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la foto de perfil");
      }

      return await response.json();
    };

    toast.promise(updateProfilePhoto(), {
      loading: "Actualizando foto de perfil...",
      error: (error) => error.message,
      success: (data) => {
        setProfessionalProfile((prev) => {
          return { ...prev, picture: data.filename };
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
    handleUpdateProfilePhoto,
  };
}

export default useUpdateProfilePhoto;
