import "./ProfessionalList.css";
import { CiSearch } from "react-icons/ci";

function ProfessionalsList() {
  return (
    <div className="cms-professional-list">
      <div className="cms-professional_filter">
        <form>
          <input type="text" placeholder="Buscar" />
          <CiSearch className="professionals_search-filter_icon" />
        </form>
      </div>
      <div className="cms-professional_body">
        <table>
          <tr className="header_table">
            <th className="header_table-name">Nombre</th>
            <th className="header_table-price">Stock</th>
            <th className="header_table-options">Precio</th>
          </tr>
          {<tr></tr>}
        </table>
      </div>
    </div>
  );
}

export default ProfessionalsList;
