import "./SchedulesHeader.css";

import React from "react";

function SchedulesHeader({ date }) {
  return (
    <section className="schedules-header_container">
      <p>{date}</p>
      <p>Intervalo</p>
    </section>
  );
}

export default SchedulesHeader;
