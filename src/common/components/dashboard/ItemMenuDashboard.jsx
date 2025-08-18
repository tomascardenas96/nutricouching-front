import { AiOutlineProduct } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { GoBook } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import { LuTimer } from "react-icons/lu";
import { PiStudentLight, PiTagThin } from "react-icons/pi";
import { TbHealthRecognition } from "react-icons/tb";
import "./ItemMenuDashboard.css";

function ItemMenuDashboard({ option, isSelected, selectOptionDashboardMenu }) {
  return (
    <li
      className={`item-menu-dashboard ${
        isSelected && `selected-dashboard-item`
      }`}
      onClick={() => selectOptionDashboardMenu(option)}
    >
      <div>
        {option === "Usuarios" && <FiUsers className="icon icon-user" />}
        {option === "Profesionales" && <CiStar className="icon" />}
        {option === "Productos" && <AiOutlineProduct className="icon" />}
        {option === "Viandas" && <TbHealthRecognition className="icon" />}
        {option === "Especialidades" && <PiStudentLight className="icon" />}
        {option === "Planes" && <PiTagThin />}
        {option === "Turnos" && <GoBook />}
        {option === "Horarios de Atencion" && <LuTimer />}
        <span>{option}</span>
      </div>
      <IoIosArrowForward className="arrow-icon" />
    </li>
  );
}

export default ItemMenuDashboard;
