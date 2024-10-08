import "./Presentation.css";
import { IoLogoWhatsapp } from "react-icons/io";
import { TbClockHour4Filled } from "react-icons/tb";
import Dots from "../Common/Dots";

function Presentation() {
  return (
    <section className="presentation">
      <div className="presentation-banner_container">
        <div className="banner">
          <img src="/src/public/assets/banner1.png" alt="banner" />
          <div className="presentation-dots">
            <Dots />
          </div>
        </div>
        <img
          src="/src/public/assets/hearts.png"
          className="background-stencil_heart"
          alt="stencil-presentation"
        />
        <img
          src="/src/public/assets/people-line.png"
          className="background-stencil_hug"
          alt="stencil-presentation"
        />
      </div>
    </section>
  );
}

export default Presentation;
