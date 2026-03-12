import { useEffect } from "react";
import { useState } from "react";
import apiClient from "../../auth/api/apiClient";

function useGetProfessionalSchedule(professionalId) {
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

          const { data } = await apiClient.get(
            `/availability?professional=${professionalId}&date=${formattedDate}`
          );

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
