import BaseModal from "../../../../../common/components/BaseModal";
import useCreateService from "../../../hooks/useCreateService";
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
    <BaseModal
      isOpen={true}
      onClose={handleAddServiceModal}
      onSubmit={handleSubmitCreateService}
      title="Agregar servicio"
      footer={
        <div className="bm-footer__actions">
          <button
            type="button"
            className="bm-btn bm-btn--secondary"
            onClick={handleAddServiceModal}
          >
            Cancelar
          </button>
          <button type="submit" className="bm-btn bm-btn--primary">
            Guardar
          </button>
        </div>
      }
    >
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
                src="/assets/no-picture.png"
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
    </BaseModal>
  );
}

export default AddServiceModal;
