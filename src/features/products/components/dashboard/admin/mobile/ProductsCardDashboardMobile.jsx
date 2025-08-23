import { createPortal } from "react-dom";
import ConfirmationModal from "../../../../../../common/components/ConfirmationModal";
import useDeleteProduct from "../../../../hooks/useDeleteProduct";
import "./ProductsCardDashboardMobile.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function ProductsCardDashboardMobile({
  product,
  setProducts,
  handleModifyProductModalOpen,
}) {
  const { deleteProduct, closeModal, openModal, isModalOpen } =
    useDeleteProduct(setProducts);

  return (
    <>
      <div className="product-card-dashboard-container">
        <div className="image-container">
          <img
            src={product.image}
            alt="foto del producto del dashboard superuser"
          />
        </div>

        <div className="info-container">
          <p className="name">{product.name}</p>

          <div className="stock-price">
            <p>
              <span>Stock:</span>
              {product.stock}u
            </p>
            <p>
              <span>Precio:</span>$ {product.price}
            </p>
          </div>

          <div className="buttons-container">
            <button
              className="edit-btn"
              onClick={() => handleModifyProductModalOpen(product)}
            >
              <FaEdit /> Editar
            </button>
            <button
              className="delete-btn"
              onClick={() => openModal(product.productId)}
            >
              <MdDelete />
              Eliminar
            </button>
          </div>
        </div>
      </div>

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

export default ProductsCardDashboardMobile;
