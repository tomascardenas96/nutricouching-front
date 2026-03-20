import BaseModal from "../../../../../../common/components/BaseModal";
import useModifyProduct from "../../../../hooks/useModifyProduct";
import "./ModifyProductModal.css";

function ModifyProductModal({
  selectedProduct,
  handleModifyProductModalClose,
  setProducts,
}) {
  const {
    handleSubmitModifyProduct,
    handleChangeModifyProduct,
    modifyProductInput,
    imagePreviewModifyProduct,
    handleChangeSelectedFile,
    fileModifyProduct,
  } = useModifyProduct(
    selectedProduct,
    setProducts,
    handleModifyProductModalClose
  );

  return (
    <BaseModal
      isOpen={true}
      onClose={handleModifyProductModalClose}
      onSubmit={handleSubmitModifyProduct}
      title="Modificar producto"
      footer={
        <div className="bm-footer__actions">
          <button
            type="button"
            className="bm-btn bm-btn--secondary"
            onClick={handleModifyProductModalClose}
          >
            Cancelar
          </button>
          <button type="submit" className="bm-btn bm-btn--primary">
            Guardar
          </button>
        </div>
      }
    >
      <div className="modify-product_body">
        <label htmlFor="name">
          <input
            type="text"
            placeholder="Nombre"
            name="name"
            value={modifyProductInput.name}
            onChange={handleChangeModifyProduct}
          />
        </label>
        <label htmlFor="description">
          <input
            type="text"
            placeholder="Descripcion"
            name="description"
            value={modifyProductInput.description}
            onChange={handleChangeModifyProduct}
          />
        </label>
        <label htmlFor="stock">
          <input
            type="number"
            placeholder="Stock"
            name="stock"
            value={modifyProductInput.stock}
            onChange={handleChangeModifyProduct}
          />
        </label>
        <label htmlFor="price">
          <input
            type="number"
            placeholder="Precio"
            name="price"
            value={modifyProductInput.price}
            onChange={handleChangeModifyProduct}
          />
        </label>
        <label htmlFor="image" className="modify-product_upload-photo">
          <div>
            {fileModifyProduct ? (
              <img
                src={imagePreviewModifyProduct}
                alt="selected-image-modify-product"
              />
            ) : (
              <img
                src={modifyProductInput.image}
                alt="selected-product-picture"
              />
            )}
          </div>
          <p>Selecciona una foto</p>
          <input
            type="file"
            id="image"
            onChange={handleChangeSelectedFile}
          />
        </label>
      </div>
    </BaseModal>
  );
}

export default ModifyProductModal;
