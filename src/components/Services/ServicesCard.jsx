import "./ServicesCard.css";
import { FaArrowRight } from "react-icons/fa6";

function ServiceCard({ image, color, title, description, icon }) {
  return (
    <div className="services-card_container">
      <div className="card-header" style={{ backgroundColor: color }}>
        <p className="icon">{icon}</p>
        <div className="card-img">
          <img src={image} alt="services-picture-nutricouching" />
        </div>
      </div>
      <div className="card-description">
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="know-more">
          <div>
            <p>Saber más</p>
            <FaArrowRight className="arrow-right" style={{ color: color }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
