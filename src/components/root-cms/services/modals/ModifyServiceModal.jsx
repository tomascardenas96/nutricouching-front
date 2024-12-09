import { ImCheckmark, ImCross } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { HOST } from "../../../../api/data";
import useModifyService from "../../../../hooks/useModifyService";
import "./ModifyServiceModal.css";

function ModifyServiceModal({
  handleModifyServiceModal,
  selectedService,
  setServices,
}) {
  const {
    handleSubmitModifyService,
    handleChangeModifyService,
    handleChangeSelectedFile,
    modifyServiceInput,
    imagePreviewModifyService,
    fileModifyService,
  } = useModifyService(selectedService, handleModifyServiceModal, setServices);

  return (
    <section
      className="modal-cms_modify-service_container"
      onClick={handleModifyServiceModal}
    >
      <form
        className="modify-service-modal_form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmitModifyService}
      >
        <div className="modify-service_title">
          <h1>Modificar servicio</h1>
          <IoMdClose
            className="modify-service-modal-close"
            onClick={handleModifyServiceModal}
          />
        </div>

        <div className="modify-service_body">
          <label htmlFor="title">
            <input
              type="text"
              placeholder="Titulo"
              name="title"
              value={modifyServiceInput.title}
              onChange={handleChangeModifyService}
            />
          </label>
          <label htmlFor="description">
            <input
              type="text"
              placeholder="Descripcion"
              name="description"
              value={modifyServiceInput.description}
              onChange={handleChangeModifyService}
            />
          </label>

          <label htmlFor="price">
            <input
              type="number"
              placeholder="Precio"
              name="price"
              value={modifyServiceInput.price}
              onChange={handleChangeModifyService}
            />
          </label>
          <label htmlFor="image" className="modify-service_upload-photo">
            <div>
              {fileModifyService ? (
                <img
                  src={imagePreviewModifyService}
                  alt="selected-image-modify-service"
                />
              ) : (
                <img
                  src={`${HOST}/uploads/services/${modifyServiceInput.image}`}
                  alt="selected-service-picture"
                />
              )}
            </div>
            <p>Selecciona una foto</p>
            <input type="file" id="image" onChange={handleChangeSelectedFile} />
          </label>
        </div>

        <div className="modify-service_buttons">
          <ImCross
            className="modify-cancel-service modify-cancel-service_close"
            onClick={handleModifyServiceModal}
          />
          <div>
            <label htmlFor="modify-service_submit">
              <input type="submit" id="modify-service_submit" />
              <ImCheckmark className="modify-cancel-service modify-cancel-service_done" />
            </label>
          </div>
        </div>
      </form>
    </section>
  );
}

export default ModifyServiceModal;
