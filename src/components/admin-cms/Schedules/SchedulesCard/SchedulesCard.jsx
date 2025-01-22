import "./SchedulesCard.css";

import React from "react";

function SchedulesCard({ from, to, interval }) {
  return (
    <div className="schedules-card_container">
      <div className="left">
        <p>Desde: {from}hs</p>
        <p>-{interval}min</p>
      </div>

      <div className="right">
        <p>Hasta: {to}hs</p>
        <button>Cancelar Turno</button>
      </div>
    </div>
  );
}

export default SchedulesCard;
