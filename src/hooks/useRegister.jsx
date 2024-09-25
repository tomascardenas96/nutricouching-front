import { useState } from "react";
import { HOST } from "../api/data";
import { toast } from "sonner";

function useRegister() {
  const [registerInput, setRegisterInput] = useState({
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    const registerUser = async () => {
      const response = await fetch(`${HOST}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registerInput.name,
          lastname: registerInput.lastname,
          username: registerInput.username,
          email: registerInput.email,
          password: registerInput.password,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message);
      }

      return data;
    };

    // Usamos toast.promise para manejar los mensajes de feedback
    toast
      .promise(registerUser(), {
        loading: "Creando usuario...",
        success: (data) => {
          return `Registro completado exitosamente!`;
        },
        error: (error) => {
          setRegisterError(true);
          return `Error: complete los campos requeridos`;
        },
      })
      .finally(() => {
        setRegisterLoading(false);
      });
  };

  const handleChangeRegister = (e) => {
    const { name, value } = e.target;
    setRegisterInput({ ...registerInput, [name]: value });
  };

  const handleRegisterModal = () => {
    setIsRegisterModalOpen(!isRegisterModalOpen);
  };

  return {
    registerInput,
    registerLoading,
    registerError,
    handleSubmitRegister,
    handleChangeRegister,
    isRegisterModalOpen,
    handleRegisterModal,
  };
}

export default useRegister;
