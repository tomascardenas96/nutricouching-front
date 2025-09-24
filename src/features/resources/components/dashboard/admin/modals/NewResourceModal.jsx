import useCreateResource from "../../../../hooks/useCreateResource";
import "./NewResourceModal.css";

function NewResourceModal({ setResources, handleAddResourceModal }) {
  const {
    handleCreateResource,
    handleChangeInput,
    handleChangePdf,
    handleChangeImage,
    imagePreview,
    createResourceInput,
  } = useCreateResource(setResources, handleAddResourceModal);

  return (
    <div className="new-resource-modal_bg">
      <form onSubmit={handleCreateResource}>
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

        <span
          className="btn"
          onClick={handleAddResourceModal}
        >
          Cerrar
        </span>
        <button className="btn">Crear</button>
      </form>
    </div>
  );
}

export default NewResourceModal;
