import useGetAllSpecialties from "../../hooks/useGetAllSpecialties";
import "./PreviousShiftUserCard.css";

import React from "react";

function PreviousShiftUserCard({
  name,
  timetable,
  specialty,
  date,
  booking,
  startTimetable,
  endTimetable,
}) {
  const { errorSpecialties, loadingSpecialties, specialties } =
    useGetAllSpecialties();

  const getSpecialtyById = (specialtyId) => {
    const specialty = specialties?.find(
      (specialty) => specialty?.specialtyId === specialtyId
    );
    return specialty?.name;
  };

  const formatDate = (date) => {
    const newDate = new Date(date);

    return `${newDate.getDate() + 1}/${
      newDate.getMonth() + 1
    }/${newDate.getFullYear()}`;
  };

  return (
    <div className="previous-shift-user-card">
      <div className="left">
        <p>{name}</p>
        <p>{`${startTimetable.substring(0, 5)}hs - ${endTimetable.substring(
          0,
          5
        )}hs`}</p>
      </div>

      <div className="right">
        <p>{getSpecialtyById(specialty)}</p>
        <p>{formatDate(date)}</p>
      </div>
    </div>
  );
}

export default PreviousShiftUserCard;
