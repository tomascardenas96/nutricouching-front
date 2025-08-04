import { HOST } from "../../../../api/data";
import "./ServicesCard.css";

function ServiceCard({
  image,
  color,
  description,
  title,
  handleSelectService,
  handleOpenServiceModal,
  isEven,
  type,
  handleOpenSmartPlanModal,
}) {
  const handleSelectServiceAndOpenModal = () => {
    handleSelectService();
    if (type === "schedule") handleOpenServiceModal();
    if (type === "plan_download") handleOpenSmartPlanModal();
  };

  return (
    <div
      className={`services-card_container ${!isEven && "right-service-cards"}`}
    >
      <div
        className="color-line"
        style={{ borderTop: `1.5px solid ${color}` }}
      ></div>
      <div className="card-img" style={{ gridColumn: !isEven && "2 / 3" }}>
        <img
          src={`${HOST}/uploads/services/${image}`}
          className="service-image"
          alt="services-picture-nutricouching"
        />
      </div>

      <div className="card-description">
        <h1>{title?.toUpperCase()}</h1>
        <div className="know-more">
          <div
            onClick={handleSelectServiceAndOpenModal}
            style={{ backgroundColor: color }}
          >
            <p>Ver más</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
