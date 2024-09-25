import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function useBookAppointment() {
  const [date, setDate] = useState("");
  const [Time, setTime] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [userId, setUserId] = useState("");
  const [professionalId, setProfessionalId] = useState("");

  
}

export default useBookAppointment;
