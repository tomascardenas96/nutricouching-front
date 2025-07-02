import { ImCheckmark, ImCross } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { HOST } from "../../../../../../api/data";
import useModifyProduct from "../../../../hooks/useModifyProduct";
import "./ModifyProductModal.css";

function ModifyProductModal({
  selectedProduct,
  setSelectedProduct,
  handleModifyProductModal,
  setProducts,
}) {
  const {
    handleSubmitModifyProduct,
    handleChangeModifyProduct,
    modifyProductInput,
    handleChangeSelectedFile,
    fileModifyProduct,
    imagePreviewModifyProduct,
  } = useModifyProduct(
    selectedProduct,
    setSelectedProduct,
    handleModifyProductModal,
    setProducts
  );

  return (
    <section
      className="modal-cms_modify-product_container"
      onClick={handleModifyProductModal}
    >
      <form
        className="modify-product-modal_form"
        onSubmit={handleSubmitModifyProduct}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modify-product_title">
          <h1>Modificar producto</h1>
          <IoMdClose
            className="modify-product-modal-close"
            onClick={handleModifyProductModal}
          />
        </div>

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
              {" "}
              {fileModifyProduct ? (
                <img
                  src={imagePreviewModifyProduct}
                  alt="selected-image-modify-product"
                />
              ) : (
                <img
                  src={`${HOST}/uploads/products/${modifyProductInput.image}`}
                  alt="selected-product-picture"
                />
              )}
            </div>
            <p>Selecciona una foto</p>
            <input type="file" id="image" onChange={handleChangeSelectedFile} />
          </label>
        </div>

        <div className="modify-product_buttons">
          <ImCross
            className="modify-cancel-product modify-cancel-product_close"
            onClick={handleModifyProductModal}
          />
          <div>
            <label htmlFor="modify-product_submit">
              <input type="submit" id="modify-product_submit" />
              <ImCheckmark className="modify-cancel-product modify-cancel-product_done" />
            </label>
          </div>
        </div>
      </form>
    </section>
  );
}

export default ModifyProductModal;
