import "./Presentation.css";
import { IoLogoWhatsapp } from "react-icons/io";
import { TbClockHour4Filled } from "react-icons/tb";

function Presentation() {
  return (
    <div className="presentation">
      <div className="presentation_main">
        <div className="presentation-picture">
          <div>
            <img
              src="../../../src/assets/natasha.png"
              alt="presentation-picture"
            />
          </div>
        </div>
        <div className="presentation-text">
          <div className="title">
            <h1>¡Hola! Mi nombre es Natasha Dirialdi</h1>
          </div>
          <div className="description">
            <p>
              Soy Natasha Dirialdi, nutricionista y coach apasionada por mejorar
              la salud de las personas a través de planes de alimentación
              personalizados, desarrollo de hábitos sostenibles y un enfoque
              integral en el bienestar.
            </p>
          </div>
          <div className="contact-button">
            <button type="button" className="contact">
              <IoLogoWhatsapp className="icon" /> CONTACTAME
            </button>
            <button type="button" className="appointment">
              <TbClockHour4Filled className="icon" /> TURNO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Presentation;
