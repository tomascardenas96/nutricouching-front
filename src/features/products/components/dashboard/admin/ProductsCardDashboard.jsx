import { HOST } from "../../../../../api/data";
import "./ProductsCardDashboard.css";

function ProductsCardDashboard({ product, handleModifyProductModal }) {
  return (
    <>
      <tr
        className="dashboard_product-item"
        key={`product-${product.productId}`}
      >
        <td className="image-row">
          <div>
            <img
              src={`${HOST}/uploads/products/${product.image}`}
              alt="imagen de productos dashboard root"
            />
          </div>
        </td>
        <td>{product.name}</td>
        <td className="stock-row">{product.stock} u</td>
        <td className="price-row">$ {product.price}</td>
        <td className="options-row">
          <p className="edit" onClick={() => handleModifyProductModal(product)}>
            Editar
          </p>
          <p className="delete">Eliminar</p>
        </td>
        <div className="divider-line_container">
          <hr className="divider-line" />
        </div>
      </tr>
    </>
  );
}

export default ProductsCardDashboard;
