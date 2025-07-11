import { useEffect, useState } from "react";
import { toast } from "sonner";
import { HOST } from "../../../api/data";

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
    const token = localStorage.getItem("authToken");
    const parsedUpdateProfileInput = Object.fromEntries(
      Object.entries(updateProfileInput).filter(
        ([_, value]) => value != null && value !== ""
      )
    );

    const updateProfile = async () => {
      const response = await fetch(`${HOST}/profile/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(parsedUpdateProfileInput),
      });

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

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
