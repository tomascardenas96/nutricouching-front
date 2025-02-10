import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import "./SpecialtiesCard.css";

function SpecialtyCard({ specialty }) {
  return (
    <>
      <td>{specialty.name}</td>

      <td>{specialty.service.title}</td>

      <td className="services-cms_options">
        <p>
          <FaRegEdit />
          <FaRegTrashAlt />
        </p>
      </td>
    </>
  );
}

export default SpecialtyCard;
