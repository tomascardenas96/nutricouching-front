import { Plus, X } from "lucide-react";
import BaseModal from "../../../../../../common/components/BaseModal";
import useCreateViand from "../../../../hooks/useCreateViand";
import "./AddViandModal.css";

function AddViandModal({ handleAddViandModal, setViands }) {
  const {
    handleSubmitCreateViand,
    handleChangeCreateViand,
    handleChangeCreateViandFile,
    createViandInput,
    fileCreateViand,
    imagePreviewCreateViand,
    addIngredient,
    updateIngredient,
    removeIngredient,
  } = useCreateViand(setViands, handleAddViandModal);

  return (
    <BaseModal
      isOpen={true}
      onClose={handleAddViandModal}
      onSubmit={handleSubmitCreateViand}
      title="Agregar Vianda"
      footer={
        <div className="bm-footer__actions">
          <button
            type="button"
            className="bm-btn bm-btn--secondary"
            onClick={handleAddViandModal}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bm-btn bm-btn--primary"
            disabled={!fileCreateViand}
          >
            Guardar
          </button>
        </div>
      }
    >
      <div className="add-viand_body">
        <label htmlFor="name">
          <input
            type="text"
            placeholder="Nombre"
            name="name"
            onChange={handleChangeCreateViand}
            value={createViandInput.name}
          />
        </label>
        <label htmlFor="description">
          <input
            type="text"
            placeholder="Descripcion"
            name="description"
            onChange={handleChangeCreateViand}
            value={createViandInput.description}
          />
        </label>
        <label htmlFor="stock">
          <input
            type="number"
            placeholder="Stock"
            name="stock"
            onChange={handleChangeCreateViand}
            value={createViandInput.stock}
          />
        </label>
        <label htmlFor="price">
          <input
            type="number"
            placeholder="Precio"
            name="price"
            onChange={handleChangeCreateViand}
            value={createViandInput.price}
          />
        </label>
        <div className="add-viand-ingredients">
          <div className="ingredients-header">
            <h3>Ingredientes</h3>
            <button
              type="button"
              onClick={addIngredient}
              className="add-ingredient-button"
            >
              <Plus className="icon add-icon" /> Agregar Ingrediente
            </button>
          </div>
          {createViandInput.ingredients.map((ingredient) => (
            <div key={ingredient.id} className="ingredient-item">
              <input
                type="text"
                placeholder="Nombre del ingrediente"
                value={ingredient.name}
                onChange={(e) =>
                  updateIngredient(ingredient.id, "name", e.target.value)
                }
              />
              <button
                type="button"
                onClick={() => removeIngredient(ingredient.id)}
                className="remove-ingredient-button"
              >
                <X className="icon x-icon" />
              </button>
            </div>
          ))}
        </div>
        <label htmlFor="image" className="add-viand_upload-photo">
          <div>
            {fileCreateViand ? (
              <img
                src={imagePreviewCreateViand}
                alt="add-viand_selected-image-preview"
                className="add-viand_selected-image-preview"
              />
            ) : (
              <img src="/assets/no-picture.png" alt="no-picture-selected" />
            )}
          </div>
          <p>Selecciona una foto</p>
          <input
            type="file"
            id="image"
            onChange={handleChangeCreateViandFile}
          />
        </label>
      </div>
    </BaseModal>
  );
}

export default AddViandModal;
