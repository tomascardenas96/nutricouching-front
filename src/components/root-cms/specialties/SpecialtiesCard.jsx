import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import "./SpecialtiesCard.css";

function SpecialtyCard({ specialty, handleDeleteSpecialty }) {
  return (
    <>
      <td>{specialty.name}</td>

      <td>{specialty.service.title}</td>

      <td className="services-cms_options">
        <p>
          <FaRegTrashAlt
            onClick={() => handleDeleteSpecialty(specialty.specialtyId)}
          />
        </p>
      </td>
    </>
  );
}

export default SpecialtyCard;
