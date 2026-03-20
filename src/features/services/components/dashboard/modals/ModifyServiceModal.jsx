import BaseModal from "../../../../../common/components/BaseModal";
import useModifyService from "../../../hooks/useModifyService";
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
    <BaseModal
      isOpen={true}
      onClose={handleModifyServiceModal}
      onSubmit={handleSubmitModifyService}
      title="Modificar servicio"
      footer={
        <div className="bm-footer__actions">
          <button
            type="button"
            className="bm-btn bm-btn--secondary"
            onClick={handleModifyServiceModal}
          >
            Cancelar
          </button>
          <button type="submit" className="bm-btn bm-btn--primary">
            Guardar
          </button>
        </div>
      }
    >
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
                src={modifyServiceInput.image}
                alt="selected-service-picture"
              />
            )}
          </div>
          <p>Selecciona una foto</p>
          <input type="file" id="image" onChange={handleChangeSelectedFile} />
        </label>
      </div>
    </BaseModal>
  );
}

export default ModifyServiceModal;
