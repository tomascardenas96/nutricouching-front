import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { HOST } from "../api/data";

function useGetSpecialtiesByQuery() {
  const authToken = localStorage.getItem("authToken");

  const [specialties, setSpecialties] = useState([]);
  const [specialtiesUserInput, setSpecialtiesUserInput] = useState("");
  const [specialtiesLoading, setSpecialtiesLoading] = useState(true);
  const [specialtiesError, setSpecialtiesError] = useState(null);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);

  const handleSelectSpecialty = (specialty) => {
    setSelectedSpecialties((prev) => {
      const isSpecialtyAlreadySelected = prev.find(
        (sp) => sp.name === specialty.name
      );

      setSpecialtiesUserInput("");

      if (!isSpecialtyAlreadySelected) {
        return [...prev, { ...specialty }];
      }

      return prev;
    });
  };

  //Elimina un elemento de la lista de especialidades seleccionadas, si es una especialidad que no existe en la DB tambien la elimina desde el local storage.
  const handleUnselectSpecialty = (specialty) => {
    setSelectedSpecialties((prev) => {
      if (!specialty.specialtyId) {
        const specialtiesSavedInLocalStorage =
          localStorage.getItem("new-specialties");

        const parsedSpecialties = JSON.parse(specialtiesSavedInLocalStorage);
        const updatedSpecialtiesWithinLocal = parsedSpecialties.filter(
          (s) => s.name !== specialty.name
        );

        localStorage.setItem(
          "new-specialties",
          JSON.stringify(updatedSpecialtiesWithinLocal)
        );
      }

      return prev.filter((sp) => sp.name !== specialty.name);
    });
  };

  useEffect(() => {
    getSpecialtiesByQuery();
  }, [specialtiesUserInput]);

  const getSpecialtiesByQuery = async () => {
    try {
      const response = await fetch(
        `${HOST}/specialty/filter?name=${specialtiesUserInput}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        throw new Error(data.message);
      }

      setSpecialties(data);
    } catch (error) {
      setSpecialtiesError(error);
    } finally {
      setSpecialtiesLoading(false);
    }
  };

  const handleChangeSpecialtiesUserInput = (e) => {
    setSpecialtiesUserInput(e.target.value);
  };

  return {
    handleChangeSpecialtiesUserInput,
    specialties,
    specialtiesUserInput,
    specialtiesLoading,
    specialtiesError,
    selectedSpecialties,
    handleSelectSpecialty,
    handleUnselectSpecialty,
    setSpecialties,
    setSelectedSpecialties,
    setSpecialtiesUserInput,
  };
}

export default useGetSpecialtiesByQuery;
