import useModifyResource from "../../../../hooks/useModifyResource";
import "./UpdateResourceModal.css";

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
    imagePreview,
  } = useModifyResource(
    selectedResource,
    closeModifyResourceModal,
    setResources
  );

  return (
    <div className="modify-resource-modal_bg">
      <form onSubmit={handleModifyResource}>
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

        <label htmlFor="price">
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

        <span onClick={closeModifyResourceModal}>Cerrar</span>
        <button>Modificar</button>
      </form>
    </div>
  );
}

export default UpdateResourceModal;
