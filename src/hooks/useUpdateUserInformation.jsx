import { useEffect, useState } from "react";
import { useUser } from "../context/UserProvider";
import { toast } from "sonner";
import { HOST } from "../api/data";

function useUpdateUserInformation() {
  const authToken = localStorage.getItem("authToken");
  const { user } = useUser();

  const [updateUserInput, setUpdateUserInput] = useState({
    name: "",
    lastname: "",
    oldPassword: "",
    password: "",
  });

  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [incorrectConfirmPassword, setIncorrectConfirmPassword] =
    useState(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    setUpdateUserInput({
      name: user.name,
      lastname: user.lastname,
      oldPassword: "",
      password: "",
    });
  }, [user]);

  const onSubmitUpdateUserInformation = async (e) => {
    e.preventDefault();

    const updateUserInformationPromise = async () => {
      if (confirmNewPassword !== updateUserInput.password) {
        setIncorrectConfirmPassword(true);
        throw new Error("La contraseña no coincide");
      }

      const response = await fetch(`${HOST}/auth/update/${user.userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updateUserInput),
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error("Error al actualizar los datos de usuario");

      return data;
    };

    toast.promise(updateUserInformationPromise(), {
      success: "Usuario actualizado!",
      loading: "Actualizando usuario...",
      error: (err) => err.message,
    });
  };

  const handleChangeUserInput = (e) => {
    const { name, value } = e.target;

    setUpdateUserInput({ ...updateUserInput, [name]: value });
  };

  return {
    updateUserInput,
    onSubmitUpdateUserInformation,
    handleChangeUserInput,
    confirmNewPassword,
    setConfirmNewPassword,
    incorrectConfirmPassword,
  };
}

export default useUpdateUserInformation;
