import BaseModal from "../../../../../../common/components/BaseModal";
import useCreateResource from "../../../../hooks/useCreateResource";

function NewResourceModal({ setResources, handleAddResourceModal }) {
  const {
    handleCreateResource,
    handleChangeInput,
    handleChangePdf,
    handleChangeImage,
    createResourceInput,
  } = useCreateResource(setResources, handleAddResourceModal);

  return (
    <BaseModal
      isOpen={true}
      onClose={handleAddResourceModal}
      onSubmit={handleCreateResource}
      title="Nuevo Recurso"
      footer={
        <div className="bm-footer__actions">
          <button
            type="button"
            className="bm-btn bm-btn--secondary"
            onClick={handleAddResourceModal}
          >
            Cancelar
          </button>
          <button type="submit" className="bm-btn bm-btn--primary">
            Crear
          </button>
        </div>
      }
    >
      <div className="plan-modal_fields">
        <label htmlFor="title">
          Titulo
          <input
            type="text"
            name="title"
            onChange={handleChangeInput}
            value={createResourceInput.title}
          />
        </label>

        <label htmlFor="description">
          Descripcion
          <input
            type="text"
            name="description"
            onChange={handleChangeInput}
            value={createResourceInput.description}
          />
        </label>

        <label htmlFor="shortDescription">
          Descripcion corta
          <input
            type="text"
            name="shortDescription"
            onChange={handleChangeInput}
            value={createResourceInput.shortDescription}
          />
        </label>

        <label htmlFor="price">
          Precio
          <input
            type="text"
            name="price"
            onChange={handleChangeInput}
            value={createResourceInput.price}
          />
        </label>

        <label htmlFor="pdf">
          Subir archivo (PDF)
          <input type="file" name="pdf" onChange={handleChangePdf} />
        </label>

        <label htmlFor="image">
          Imagen
          <input type="file" name="image" onChange={handleChangeImage} />
        </label>
      </div>
    </BaseModal>
  );
}

export default NewResourceModal;
