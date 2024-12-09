import React, { useState } from "react";

function useAddNewSpecialty(
  setSpecialties,
  setSelectedSpecialties,
  setSpecialtiesUserInput
) {
  const [isModalAddSpecialtyOpen, setIsModalAddSpecialtyOpen] = useState(false);
  const [newSpecialty, setNewSpecialty] = useState({
    name: "",
    serviceId: "",
  });

  const handleOpenAddSpecialtyModal = () => {
    setIsModalAddSpecialtyOpen(true);
    setSpecialtiesUserInput("");
  };

  const handleCloseAddSpecialtyModal = () => {
    setIsModalAddSpecialtyOpen(false);
  };

  const handleSubmitCreateSpecialty = (e) => {
    e.preventDefault();

    if (true) {
      const allSpecialtiesLocalStorage =
        localStorage.getItem("new-specialties");
      const parsedSpecialtiesArray = allSpecialtiesLocalStorage
        ? JSON.parse(allSpecialtiesLocalStorage)
        : [];

      const updatedSpecialtiesArray = [
        ...parsedSpecialtiesArray,
        { ...newSpecialty },
      ];

      localStorage.setItem(
        "new-specialties",
        JSON.stringify(updatedSpecialtiesArray)
      );

      setSelectedSpecialties((prev) => [...prev, { ...newSpecialty }]);
      handleCloseAddSpecialtyModal();
    }
  };

  const handleChangeCreateSpecialty = (e) => {
    const { name, value } = e.target;
    setNewSpecialty({ ...newSpecialty, [name]: value });
  };

  return {
    handleOpenAddSpecialtyModal,
    handleCloseAddSpecialtyModal,
    isModalAddSpecialtyOpen,
    handleSubmitCreateSpecialty,
    handleChangeCreateSpecialty,
  };
}

export default useAddNewSpecialty;
