import React, { useState } from "react";

function useHandleProfessionalSchedule() {
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const [currentSchedule, setCurrentSchedule] = useState({
    startTime: "",
    endTime: "",
    interval: "",
    day: [],
  });

  const addNewSchedule = (schedule) => {
    setSelectedSchedules((prevSchedules) => [...prevSchedules, schedule]);
    setCurrentSchedule({
      startTime: "",
      endTime: "",
      interval: "",
      day: [],
    });
  };

  const handleChangeTimeRange = (e) => {
    const { name, value } = e.target;
    setCurrentSchedule((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejar la selección o deselección de días
  const handleChangeDaysSchedule = (e) => {
    const { value, checked } = e.target;
    setCurrentSchedule((prev) => ({
      ...prev,
      day: checked
        ? [...prev.day, value] // Agregar día si está seleccionado
        : prev.day.filter((day) => day !== value), // Eliminar día si se deselecciona
    }));
  };

  return {
    selectedSchedules,
    currentSchedule,
    addNewSchedule,
    handleChangeTimeRange,
    handleChangeDaysSchedule,
  };
}

export default useHandleProfessionalSchedule;
