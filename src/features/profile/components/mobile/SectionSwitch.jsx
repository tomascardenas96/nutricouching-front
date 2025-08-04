import { useState } from "react";
import "./SectionSwitch.css";

function SectionSwitch({ selectedOption, handleSelectOption }) {
  return (
    <div className="profile_section-switch">
      <span
        onClick={() => handleSelectOption("posts")}
        className={selectedOption === "posts" && "selected-option"}
      >
        Publicaciones
      </span>{" "}
      |{" "}
      <span
        onClick={() => handleSelectOption("information")}
        className={selectedOption === "information" && "selected-option"}
      >
        Informacion de contacto
      </span>{" "}
      |{" "}
      <span
        onClick={() => handleSelectOption("schedules")}
        className={selectedOption === "schedules" && "selected-option"}
      >
        Turnos
      </span>
    </div>
  );
}

export default SectionSwitch;
