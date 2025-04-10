import "./PlanHeader.css";

import React from "react";

function PlanHeader({ title }) {
  return (
    <div className="plan-header">
      <div className="title">
        <h2>{title}</h2>
      </div>
      <hr />
    </div>
  );
}

export default PlanHeader;
