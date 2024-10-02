import { useEffect } from "react";
import { useState } from "react";
import { HOST } from "../api/data";

function useGetProfessionalSchedule() {
  const [selectedProfessional, setSelectedProfessional] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [professionalSchedule, setProfessionalSchedule] = useState([]);

  useEffect(() => {
    const getProfessionalSchedule = async () => {
      try {
        const response = await fetch(
          `${HOST}/availability?professional=${selectedProfessional}&date=${selectedDate}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();

        if (data.error) {
          throw new Error(data.message);
        }

        setProfessionalSchedule(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedDate && selectedProfessional) {
      getProfessionalSchedule();
    }
  }, [selectedDate, selectedProfessional]);

  return {
    professionalSchedule,
    setSelectedProfessional,
    setSelectedDate,
    selectedProfessional,
    selectedDate,
  };
}

export default useGetProfessionalSchedule;
