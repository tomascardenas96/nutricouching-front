import { CiSearch } from "react-icons/ci";
import "./ProductsCmsList.css";

function ProductsCmsList() {
  return (
    <div className="cms-product-list">
      <div className="cms-product_filter">
        <form>
          <input type="text" placeholder="Buscar" />
          <CiSearch className="products_search-filter_icon" />
        </form>
      </div>
      <div className="cms-product_body">
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

export default ProductsCmsList;
