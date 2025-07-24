import { createPortal } from "react-dom";
import { HOST } from "../../../../../api/data";
import ConfirmationModal from "../../../../../common/components/ConfirmationModal";
import useDeleteProduct from "../../../hooks/useDeleteProduct";
import "./ProductsCardDashboard.css";

function ProductsCardDashboard({
  product,
  setProducts,
  handleModifyProductModalOpen,
}) {
  const { deleteProduct, closeModal, openModal, isModalOpen } =
    useDeleteProduct(setProducts);

  return (
    <>
      <tr
        className="dashboard_product-item"
        key={`product-${product.productId}`}
      >
        <td className="image-row">
          <div>
            <img
              src={product.image}
              alt="imagen de productos dashboard root"
            />
          </div>
        </td>
        <td>{product.name}</td>
        <td className="stock-row">{product.stock} u</td>
        <td className="price-row">$ {product.price}</td>
        <td className="options-row">
          <p className="edit" onClick={() => handleModifyProductModalOpen(product)}>
            Editar
          </p>
          <p className="delete" onClick={() => openModal(product.productId)}>
            Eliminar
          </p>
        </td>
        <div className="divider-line_container">
          <hr className="divider-line" />
        </div>
      </tr>

      {isModalOpen &&
        createPortal(
          <ConfirmationModal
            onConfirm={deleteProduct}
            onClose={closeModal}
            message="¿Desea eliminar este producto?"
          />,
          document.getElementById("root")
        )}
    </>
  );
}

export default ProductsCardDashboard;
