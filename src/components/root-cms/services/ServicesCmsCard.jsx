import "./ServicesCmsCard.css";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

function ServicesCmsCard({ service }) {
  return (
    <>
      <td className="services-cms_name">
        <div className="service-img">
          <img src={service.image} alt="" />
        </div>
        <div className="service-title">{service.title}</div>
        <div className="service-other">service@service.com</div>
      </td>
      <td className="services-cms_price">
        <p>${service.price}</p>
      </td>
      <td className="services-cms_options">
        <p>
          <FaRegEdit />
          <FaRegTrashAlt />
        </p>
      </td>
    </>
  );
}

export default ServicesCmsCard;
