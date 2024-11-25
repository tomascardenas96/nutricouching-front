import { HOST } from "../../api/data";
import MoreInfo from "./MoreInfo";
import "./ServicesCard.css";
import { FaArrowRight } from "react-icons/fa6";

function ServiceCard({
  image,
  color,
  description,
  title,
  icon,
  handleSelectService,
  handleOpenServiceModal,
}) {
  const handleSelectServiceAndOpenModal = () => {
    handleSelectService();
    handleOpenServiceModal();
  };
  return (
    <div className="services-card_container">
      <div className="card-header" style={{ backgroundColor: color }}>
        <p className="icon">{icon}</p>
        <div className="card-img">
          <img
            src={`${HOST}/uploads/services/${image}`}
            alt="services-picture-nutricouching"
          />
        </div>
      </div>
      <div className="card-description">
        <h1>{title?.toUpperCase()}</h1>
        <p>{description}</p>
        <div className="know-more">
          <div onClick={handleSelectServiceAndOpenModal}>
            <p>Saber más</p>
            <FaArrowRight className="arrow-right" style={{ color }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
