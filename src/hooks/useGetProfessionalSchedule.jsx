import { useEffect } from "react";
import { useState } from "react";
import { HOST } from "../api/data";

function useGetProfessionalSchedule(selectedProfessional) {
  const [selectedTime, setSelectedTime] = useState(null);
  const [professionalSchedule, setProfessionalSchedule] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const getProfessionalSchedule = async () => {
      try {
        if (selectedProfessional && selectedDate) {
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
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedDate !== null && selectedProfessional) {
      getProfessionalSchedule();
    }
  }, [selectedDate, selectedProfessional]);

  return {
    professionalSchedule,
    setSelectedDate,
    selectedDate,
    setSelectedTime,
    selectedTime,
  };
}

export default useGetProfessionalSchedule;
