import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { HOST } from "../../../../api/data";
import "./ServicesCmsCard.css";

function ServicesCmsCard({
  service,
  handleModifyServiceModal,
  setSelectedService,
  openModal,
}) {
  const handleModifyServiceModalWithData = () => {
    handleModifyServiceModal();
    setSelectedService(service);
  };

  return (
    <>
      <td className="services-cms_name">
        <div className="service-img">
          <img
            src={`${HOST}/uploads/services/${service.image}`}
            alt="service-image"
          />
        </div>
        <div className="service-title">{service.title}</div>
        <div className="service-other">N profesionales disponibles</div>
      </td>
      <td className="services-cms_price">
        <p>${service.price}</p>
      </td>
      <td className="services-cms_options">
        <p>
          <FaRegEdit onClick={handleModifyServiceModalWithData} />
          <FaRegTrashAlt onClick={() => openModal(service.serviceId)} />
        </p>
      </td>
    </>
  );
}

export default ServicesCmsCard;
