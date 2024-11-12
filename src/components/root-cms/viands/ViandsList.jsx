import { CiSearch } from "react-icons/ci";
import "./ViandsList.css";

import React from "react";

function ViandsList() {
  return (
    <div className="cms-viand-list">
      <div className="cms-viand_filter">
        <form>
          <input type="text" placeholder="Buscar" />
          <CiSearch className="viands_search-filter_icon" />
        </form>
      </div>
      <div className="cms-viand_body">
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

export default ViandsList;
