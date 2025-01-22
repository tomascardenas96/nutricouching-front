import "./PreviousShiftUserCard.css";

import React from "react";

function PreviousShiftUserCard({ name, timetable, specialty, date }) {
  return (
    <div className="previous-shift-user-card">
      <div className="left">
        <p>{name}</p>
        <p>{timetable}</p>
      </div>

      <div className="right">
        <p>{specialty}</p>
        <p>{date}</p>
      </div>
    </div>
  );
}

export default PreviousShiftUserCard;
