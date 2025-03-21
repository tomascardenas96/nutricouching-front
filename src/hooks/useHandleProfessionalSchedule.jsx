import React, { useState } from "react";
import { toast } from "sonner";

function useHandleProfessionalSchedule() {
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const [currentSchedule, setCurrentSchedule] = useState({
    startTime: "",
    endTime: "",
    interval: "",
    day: [],
  });

  const addNewSchedule = (schedule) => {
    if (
      !schedule.day.length ||
      !schedule.startTime ||
      !schedule.endTime ||
      !schedule.interval
    ) {
      toast.warning("Debe elegir dias y horarios");
      return;
    }

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

  const spanishDays = [
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
    "domingo",
  ];

  return {
    selectedSchedules,
    currentSchedule,
    addNewSchedule,
    handleChangeTimeRange,
    handleChangeDaysSchedule,
    spanishDays,
  };
}

export default useHandleProfessionalSchedule;
