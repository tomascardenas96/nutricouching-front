import { ImCheckmark, ImCross } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import useCreateProduct from "../../../../hooks/useCreateProduct";
import "./AddProductModal.css";

function AddProductModal({ handleAddProductModal, setProducts }) {
  const {
    handleSubmitCreateProduct,
    handleChangeCreateProduct,
    createProductInput,
    handleChangeCreateProductPicture,
    selectedImage,
    imagePreview,
    file,
  } = useCreateProduct(setProducts, handleAddProductModal);

  return (
    <section
      className="modal-cms_add-product_container"
      onClick={handleAddProductModal}
    >
      <form
        className="add-product-modal_form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmitCreateProduct}
      >
        <div className="add-product_title">
          <h1>Agregar producto</h1>
          <IoMdClose
            className="add-product-modal-close"
            onClick={handleAddProductModal}
          />
        </div>

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
              {" "}
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

        <div className="add-product_buttons">
          <ImCross
            className="add-cancel-product add-cancel-product_close"
            onClick={handleAddProductModal}
          />
          <div>
            <label htmlFor="add-product_submit">
              <input type="submit" id="add-product_submit" />
              <ImCheckmark className="add-cancel-product add-cancel-product_done" />
            </label>
          </div>
        </div>
      </form>
    </section>
  );
}

export default AddProductModal;
