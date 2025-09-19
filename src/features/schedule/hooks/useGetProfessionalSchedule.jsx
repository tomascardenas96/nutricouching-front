import { useEffect } from "react";
import { useState } from "react";
import { HOST } from "../../../api/data";

function useGetProfessionalSchedule(professionalId) {
  const authToken = localStorage.getItem("authToken");

  const [selectedTime, setSelectedTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [professionalSchedule, setProfessionalSchedule] = useState([]);
  const [scheduleLoading, setScheduleLoading] = useState(true);
  const [scheduleError, setScheduleError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);


  useEffect(() => {
    const getProfessionalSchedule = async () => {
      setScheduleError(null);
      setScheduleLoading(true);

      try {
        if (professionalId && selectedDate) {
          const year = selectedDate.getUTCFullYear();
          const month = String(selectedDate.getUTCMonth() + 1).padStart(2, "0");
          const day = String(selectedDate.getUTCDate()).padStart(2, "0");

          const formattedDate = `${year}-${month}-${day}`;

          const response = await fetch(
            `${HOST}/availability?professional=${professionalId}&date=${formattedDate}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error();
          }

          const data = await response.json();

          setProfessionalSchedule(data);
        }
      } catch (error) {
        console.error(error);
        setScheduleError(true);
      } finally {
        setScheduleLoading(false);
      }
    };

    if (selectedDate !== null && professionalId) {
      getProfessionalSchedule();
    }
  }, [selectedDate, professionalId]);

  return {
    professionalSchedule,
    setSelectedDate,
    selectedDate,
    setSelectedTime,
    selectedTime,
    endTime,
    setEndTime,
    scheduleLoading,
    scheduleError,
  };
}

export default useGetProfessionalSchedule;
