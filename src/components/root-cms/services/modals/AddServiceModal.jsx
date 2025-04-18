import { ImCheckmark, ImCross } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import useCreateService from "../../../../hooks/useCreateService";
import "./AddServiceModal.css";

function AddServiceModal({ handleAddServiceModal, setServices }) {
  const {
    handleChangeCreateService,
    handleSubmitCreateService,
    createServiceInput,
    fileCreateService,
    imagePreviewCreateService,
    handleChangeCreateProductFile,
  } = useCreateService(handleAddServiceModal, setServices);

  return (
    <section
      className="modal-cms_add-service_container"
      onClick={handleAddServiceModal}
    >
      <form
        className="add-service-modal_form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmitCreateService}
      >
        <div className="add-service_title">
          <h1>Agregar servicio</h1>
          <IoMdClose
            className="add-service-modal-close"
            onClick={handleAddServiceModal}
          />
        </div>

        <div className="add-service_body">
          <label htmlFor="title">
            <input
              type="text"
              placeholder="Titulo"
              name="title"
              onChange={handleChangeCreateService}
              value={createServiceInput.title}
            />
          </label>
          <label htmlFor="description">
            <input
              type="text"
              placeholder="Descripcion"
              name="description"
              onChange={handleChangeCreateService}
              value={createServiceInput.description}
            />
          </label>
          <label htmlFor="price">
            <input
              type="number"
              placeholder="Precio"
              name="price"
              onChange={handleChangeCreateService}
              value={createServiceInput.price}
            />
          </label>
          <label htmlFor="image" className="add-service_upload-photo">
            <div>
              {fileCreateService ? (
                <img
                  src={imagePreviewCreateService}
                  alt="add-service-picture"
                  className="add-service_selected-image-preview"
                />
              ) : (
                <img
                  src="/src/public/assets/no-picture.png"
                  alt="no-picture-selected"
                />
              )}
            </div>
            <p>Selecciona una foto</p>
            <input
              type="file"
              id="image"
              onChange={handleChangeCreateProductFile}
            />
          </label>
        </div>

        <div className="add-service_buttons">
          <ImCross className="add-cancel-service add-cancel-service_close" />
          <div>
            <label htmlFor="add-service_submit">
              <input type="submit" id="add-service_submit" />
              <ImCheckmark className="add-cancel-service add-cancel-service_done" />
            </label>
          </div>
        </div>
      </form>
    </section>
  );
}

export default AddServiceModal;
