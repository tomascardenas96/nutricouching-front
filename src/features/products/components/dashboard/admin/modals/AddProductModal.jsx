import BaseModal from "../../../../../../common/components/BaseModal";
import useCreateProduct from "../../../../hooks/useCreateProduct";
import "./AddProductModal.css";

function AddProductModal({ handleAddProductModal, setProducts }) {
  const {
    handleSubmitCreateProduct,
    handleChangeCreateProduct,
    createProductInput,
    handleChangeCreateProductPicture,
    imagePreview,
    file,
  } = useCreateProduct(setProducts, handleAddProductModal);

  return (
    <BaseModal
      isOpen={true}
      onClose={handleAddProductModal}
      onSubmit={handleSubmitCreateProduct}
      title="Agregar producto"
      footer={
        <div className="bm-footer__actions">
          <button
            type="button"
            className="bm-btn bm-btn--secondary"
            onClick={handleAddProductModal}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bm-btn bm-btn--primary"
            disabled={!file}
          >
            Guardar
          </button>
        </div>
      }
    >
      <div className="add-product_body">
        <label htmlFor="name">
          <input
            type="text"
            placeholder="Nombre"
            name="name"
            onChange={(e) => handleChangeCreateProduct(e)}
            value={createProductInput.name}
          />
        </label>
        <label htmlFor="description">
          <input
            type="text"
            placeholder="Descripcion"
            name="description"
            onChange={(e) => handleChangeCreateProduct(e)}
            value={createProductInput.description}
          />
        </label>
        <label htmlFor="stock">
          <input
            type="number"
            placeholder="Stock"
            name="stock"
            onChange={(e) => handleChangeCreateProduct(e)}
            value={createProductInput.stock}
          />
        </label>
        <label htmlFor="price">
          <input
            type="number"
            placeholder="Precio"
            name="price"
            onChange={(e) => handleChangeCreateProduct(e)}
            value={createProductInput.price}
          />
        </label>
        <label htmlFor="image" className="add-product_upload-photo">
          <div>
            {file ? (
              <img
                src={imagePreview}
                alt="no-picture-selected"
                className="add-product_selected-image-preview"
              />
            ) : (
              <img src="/assets/no-picture.png" alt="no-picture-selected" />
            )}
          </div>
          <p>Selecciona una foto</p>
          <input
            type="file"
            id="image"
            accept="image/*"
            capture="camera"
            onChange={handleChangeCreateProductPicture}
          />
        </label>
      </div>
    </BaseModal>
  );
}

export default AddProductModal;
