import { HOST } from "../../../../../api/data";
import useGetAllProducts from "../../../../products/hooks/useGetAllProducts";
import "./ProductsRootDashboard.css";

function ProductsRootDashboard() {
  const { products } = useGetAllProducts();

  return (
    <table className="products-root-dashboard_table">
      <thead>
        <tr>
          <th className="image-column"></th>
          <th>Descripcion</th>
          <th className="stock-column">Stock</th>
          <th className="price-column">Precio</th>
          <th className="options-column">Opciones</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
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
              <p className="edit">Editar</p>
              <p className="delete">Eliminar</p>
            </td>
            <div className="divider-line_container">
              <hr className="divider-line" />
            </div>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductsRootDashboard;
