import { useState } from "react";
import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";

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

    const updateProfilePhoto = async () => {
      if (!!noFileSelected) {
        throw new Error("Debe seleccionar una foto");
      }

      const formData = new FormData();
      formData.append("file", file);

      const { data } = await apiClient.patch(
        `/profile/photo/${profileId}`,
        formData
      );

      return data;
    };

    toast.promise(updateProfilePhoto(), {
      loading: "Actualizando foto de perfil...",
      error: (error) => error.message,
      success: (data) => {
        console.log(data)
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
