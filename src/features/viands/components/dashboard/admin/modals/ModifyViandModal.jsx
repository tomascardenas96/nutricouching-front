import BaseModal from "../../../../../../common/components/BaseModal";
import useModifyViand from "../../../../hooks/useModifyViand";
import "./ModifyViandModal.css";

function ModifyViandModal({
  handleModifyViandModal,
  selectedViand,
  setViands,
}) {
  const {
    fileModifyViand,
    handleChangeModifyViand,
    handleChangeModifyViandFile,
    handleSubmitModifyViand,
    imagePreviewModifyViand,
    modifyViandInput,
  } = useModifyViand(selectedViand, handleModifyViandModal, setViands);

  return (
    <BaseModal
      isOpen={true}
      onClose={handleModifyViandModal}
      onSubmit={handleSubmitModifyViand}
      title="Modificar Vianda"
      footer={
        <div className="bm-footer__actions">
          <button
            type="button"
            className="bm-btn bm-btn--secondary"
            onClick={handleModifyViandModal}
          >
            Cancelar
          </button>
          <button type="submit" className="bm-btn bm-btn--primary">
            Guardar
          </button>
        </div>
      }
    >
      <div className="modify-viand_body">
        <label htmlFor="name">
          <input
            type="text"
            placeholder="Nombre"
            name="name"
            value={modifyViandInput.name}
            onChange={handleChangeModifyViand}
          />
        </label>
        <label htmlFor="description">
          <input
            type="text"
            placeholder="Descripcion"
            name="description"
            value={modifyViandInput.description}
            onChange={handleChangeModifyViand}
          />
        </label>
        <label htmlFor="stock">
          <input
            type="number"
            placeholder="Stock"
            name="stock"
            value={modifyViandInput.stock}
            onChange={handleChangeModifyViand}
          />
        </label>
        <label htmlFor="price">
          <input
            type="number"
            placeholder="Precio"
            name="price"
            value={modifyViandInput.price}
            onChange={handleChangeModifyViand}
          />
        </label>
        <label htmlFor="image" className="modify-viand_upload-photo">
          <div>
            {fileModifyViand ? (
              <img
                src={imagePreviewModifyViand}
                alt="selected-image-modify-viand"
              />
            ) : (
              <img src={selectedViand.image} alt="viand-picture" />
            )}
          </div>
          <p>Selecciona una foto</p>
          <input
            type="file"
            id="image"
            onChange={handleChangeModifyViandFile}
          />
        </label>
      </div>
    </BaseModal>
  );
}

export default ModifyViandModal;
