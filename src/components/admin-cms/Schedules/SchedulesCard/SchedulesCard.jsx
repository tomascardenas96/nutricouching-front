import "./SchedulesCard.css";

import React from "react";

function SchedulesCard({ from, to, interval, schedule }) {
  console.log(schedule);
  return (
    <div className="schedules-card_container">
      <div className="left">
        <p>Desde: {from}hs</p>
        <p>-{interval}min</p>
      </div>

      <div className="right">
        <p>Hasta: {to}hs</p>
        <button>Eliminar Horario</button>
      </div>
    </div>
  );
}

export default SchedulesCard;
