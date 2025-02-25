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
  isEven,
}) {
  const handleSelectServiceAndOpenModal = () => {
    handleSelectService();
    handleOpenServiceModal();
  };
  return (
    <div
      className="services-card_container"
      style={{
        gridTemplateColumns: !isEven && "1fr 12rem",
      }}
    >
      <div
        className="color-line"
        style={{ borderTop: `3px solid ${color}` }}
      ></div>
      <div className="card-img" style={{ gridColumn: !isEven && "2 / 3" }}>
        <img
          src={`${HOST}/uploads/services/${image}`}
          className="service-image"
          alt="services-picture-nutricouching"
        />
      </div>

      <div
        className="card-description"
        style={{
          gridColumn: !isEven && "1 / 2",
          gridRow: !isEven && "1 / 2",
          paddingLeft: !isEven && ".5rem",
          paddingRight: isEven && ".5rem",
        }}
      >
        <h1>{title?.toUpperCase()}</h1>
        <p>{description}</p>
        <div className="know-more">
          <div
            onClick={handleSelectServiceAndOpenModal}
            style={{ backgroundColor: color }}
          >
            <p>Saber más</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
