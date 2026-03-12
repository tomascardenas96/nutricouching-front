import { IoChevronDown } from "react-icons/io5";
import { TbApple, TbBrain, TbDownload } from "react-icons/tb";
import "./ServicesCard.css";

const SERVICE_ICONS = {
  plan_download: <TbBrain />,
  resource_download: <TbDownload />,
  guide: <TbApple />,
};

function ServiceCard({ title, description, type, handleSelectServiceAndOpenModal }) {
  return (
    <button className="service-strip__cell" onClick={handleSelectServiceAndOpenModal}>
      <div className="service-strip__icon">
        {SERVICE_ICONS[type]}
      </div>
      <div className="service-strip__info">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <IoChevronDown className="service-strip__chevron" />
    </button>
  );
}

export default ServiceCard;
