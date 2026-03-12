import { useEffect, useState } from "react";
import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";

function useUpdateProfileInfo(
  professionalProfile,
  setProfessionalProfile,
  handleCloseUpdateProfileModal
) {
  const [updateProfileInput, setUpdateProfileInput] = useState({
    profileName: "",
    bio: "",
    location: "",
    phone: "",
    facebook: "",
    instagram: "",
    x: "",
    tiktok: "",
  });

  useEffect(() => {
    if (professionalProfile) {
      setUpdateProfileInput({
        profileName: professionalProfile.profileName || "",
        bio: professionalProfile.bio || "",
        location: professionalProfile.location || "",
        phone: professionalProfile.phone || "",
        instagram: professionalProfile.instagram || "",
        facebook: professionalProfile.facebook || "",
        x: professionalProfile.x || "",
        tiktok: professionalProfile.tiktok || "",
      });
    }
  }, [professionalProfile]);

  const handleUpdateProfileInfo = async (e) => {
    e.preventDefault();
    const parsedUpdateProfileInput = Object.fromEntries(
      Object.entries(updateProfileInput).filter(
        ([_, value]) => value != null && value !== ""
      )
    );

    const updateProfile = async () => {
      const { data } = await apiClient.patch("/profile/update", parsedUpdateProfileInput);
      return data;
    };

    toast.promise(updateProfile(), {
      loading: "Actualizando informacion de perfil...",
      error: (error) => {
        return "Error al actualizar el perfil";
      },
      success: (data) => {
        handleCloseUpdateProfileModal();
        setProfessionalProfile(data);
        return "Perfil actualizado con éxito!";
      },
    });
  };

  const handleChangeUpdateProfileInput = (e) => {
    const { name, value } = e.target;
    setUpdateProfileInput({
      ...updateProfileInput,
      [name]: value,
    });
  };

  return {
    handleUpdateProfileInfo,
    updateProfileInput,
    handleChangeUpdateProfileInput,
  };
}

export default useUpdateProfileInfo;
