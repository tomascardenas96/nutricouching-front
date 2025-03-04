import { useEffect, useState } from "react";
import { useUser } from "../context/UserProvider";
import { toast } from "sonner";
import { HOST } from "../api/data";

function useUpdateUserInformation(
  setConfirmChangesModal,
  setIsUpdateUserModalOpen
) {
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
  const [currentPasswordError, setCurrentPasswordError] = useState(null);
  const [passwordCharError, setPasswordCharError] = useState(null);

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
    setIncorrectConfirmPassword(null);
    setCurrentPasswordError(null);
    setPasswordCharError(null);

    const hasInputsError = verifyInputs();

    if (hasInputsError) {
      setConfirmChangesModal(false);
      return;
    }

    const updateUserInformationPromise = async () => {
      const response = await fetch(`${HOST}/auth/update/${user.userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updateUserInput),
      });

      const data = await response.json();

      if (data.statusCode === 400) {
        setCurrentPasswordError("Contraseña incorrecta");
        throw new Error();
      }

      if (!response.ok) throw new Error();

      return data;
    };

    toast.promise(updateUserInformationPromise(), {
      success: (data) => {
        setIsUpdateUserModalOpen(false);
        return "Usuario actualizado!";
      },
      loading: "Actualizando usuario...",
      error: (err) => {
        setConfirmChangesModal(false);

        return "Error en los datos ingresados";
      },
    });
  };

  // Validacion de los inputs.
  const verifyInputs = () => {
    let hasErrors = false;

    if (
      (updateUserInput.password || confirmNewPassword) &&
      !updateUserInput.oldPassword
    ) {
      setCurrentPasswordError("Ingrese su contraseña actual");
      hasErrors = true;
    }

    if (
      (updateUserInput.password.length < 8 ||
        updateUserInput.password.length > 12) &&
      (updateUserInput.password || confirmNewPassword)
    ) {
      console.log(updateUserInput.password.length);
      setPasswordCharError("La contraseña debe tener entre 8 y 12 caracteres");
      hasErrors = true;
    }

    if (confirmNewPassword !== updateUserInput.password) {
      setIncorrectConfirmPassword("La contraseña no coincide");
      hasErrors = true;
    }

    if (
      !updateUserInput.password &&
      (confirmNewPassword || updateUserInput.oldPassword)
    ) {
      setIncorrectConfirmPassword("La contraseña no coincide");
      hasErrors = true;
    }

    return hasErrors;
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
    currentPasswordError,
    passwordCharError,
  };
}

export default useUpdateUserInformation;
