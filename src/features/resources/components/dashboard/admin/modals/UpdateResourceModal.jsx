import BaseModal from "../../../../../../common/components/BaseModal";
import useModifyResource from "../../../../hooks/useModifyResource";

function UpdateResourceModal({
  selectedResource,
  setResources,
  closeModifyResourceModal,
}) {
  const {
    handleModifyResource,
    modifyResourceInput,
    handleChangeInput,
    handleChangeImage,
  } = useModifyResource(
    selectedResource,
    closeModifyResourceModal,
    setResources
  );

  return (
    <BaseModal
      isOpen={true}
      onClose={closeModifyResourceModal}
      onSubmit={handleModifyResource}
      title="Modificar Recurso"
      footer={
        <div className="bm-footer__actions">
          <button
            type="button"
            className="bm-btn bm-btn--secondary"
            onClick={closeModifyResourceModal}
          >
            Cancelar
          </button>
          <button type="submit" className="bm-btn bm-btn--primary">
            Modificar
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
            value={modifyResourceInput.title}
          />
        </label>

        <label htmlFor="description">
          Descripcion
          <input
            type="text"
            name="description"
            onChange={handleChangeInput}
            value={modifyResourceInput.description}
          />
        </label>

        <label htmlFor="shortDescription">
          Resumen
          <input
            type="text"
            name="shortDescription"
            onChange={handleChangeInput}
            value={modifyResourceInput.shortDescription}
          />
        </label>

        <label htmlFor="price">
          Precio
          <input
            type="text"
            name="price"
            onChange={handleChangeInput}
            value={modifyResourceInput.price}
          />
        </label>

        <label htmlFor="isOffer">
          ¿Esta en oferta?
          <select
            name="isOffer"
            onChange={handleChangeInput}
            value={modifyResourceInput.isOffer}
          >
            <option value="">Seleccione una opcion</option>
            <option value="false">No</option>
            <option value="true">Si</option>
          </select>
        </label>

        <label htmlFor="image">
          Imagen
          <input type="file" name="image" onChange={handleChangeImage} />
        </label>
      </div>
    </BaseModal>
  );
}

export default UpdateResourceModal;
