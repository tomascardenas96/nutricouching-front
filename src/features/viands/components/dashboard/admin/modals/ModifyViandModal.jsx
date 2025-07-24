import { ImCheckmark, ImCross } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { HOST } from "../../../../../../api/data";
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
    <section
      className="modal-cms_modify-viand_container"
      onClick={handleModifyViandModal}
    >
      <form
        className="modify-viand-modal_form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmitModifyViand}
      >
        <div className="modify-viand_title">
          <h1>Modificar Vianda</h1>
          <IoMdClose
            className="modify-viand-modal-close"
            onClick={handleModifyViandModal}
          />
        </div>

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
                <img
                  src={selectedViand.image}
                  alt="viand-picture"
                />
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

        <div className="modify-viand_buttons">
          <ImCross
            className="modify-cancel-viand modify-cancel-viand_close"
            onClick={handleModifyViandModal}
          />
          <div>
            <label htmlFor="modify-viand_submit">
              <input type="submit" id="modify-viand_submit" />
              <ImCheckmark className="modify-cancel-viand modify-cancel-viand_done" />
            </label>
          </div>
        </div>
      </form>
    </section>
  );
}

export default ModifyViandModal;
