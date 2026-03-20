import { AiOutlineProduct } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { GoBook } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import { LuTimer } from "react-icons/lu";
import { PiStudentLight, PiTagThin } from "react-icons/pi";
import { BiListUl, BiCategory } from "react-icons/bi";
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
        {option === "Categorias" && <BiCategory className="icon" />}
        {option === "Planes" && <PiTagThin />}
        {option === "Turnos" && <GoBook className="icon" />}
        {option === "Horarios de Atencion" && <LuTimer className="icon" />}
        {option === "Recursos" && <BiListUl />}
        <span>{option}</span>
      </div>
      <IoIosArrowForward className="arrow-icon" />
    </li>
  );
}

export default ItemMenuDashboard;
