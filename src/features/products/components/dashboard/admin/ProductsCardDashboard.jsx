import { memo } from "react";
import { createPortal } from "react-dom";
import ConfirmationModal from "../../../../../common/components/ConfirmationModal";
import useDeleteProduct from "../../../hooks/useDeleteProduct";
import "./ProductsCardDashboard.css";

const ProductsCardDashboard = memo(function ProductsCardDashboard({
  product,
  setProducts,
  handleModifyProductModalOpen,
}) {
  const { deleteProduct, closeModal, openModal, isModalOpen } =
    useDeleteProduct(setProducts);

  return (
    <>
      <tr className="dashboard_product-item">
        <td className="image-row">
          <div>
            <img src={product.image} alt="imagen de productos dashboard root" />
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
      </tr>

      {isModalOpen &&
        createPortal(
          <ConfirmationModal
            onConfirm={deleteProduct}
            onClose={closeModal}
            message="¿Desea eliminar este producto?"
          />,
          document.getElementById("root-portal")
        )}
    </>
  );
});

export default ProductsCardDashboard;
