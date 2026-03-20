import BaseModal from "../../../../../../common/components/BaseModal";
import useCreateCategory from "../../../../hooks/useCreateCategory";
import "./CategoryModal.css";

function CreateCategoryModal({ closeModal, setCategories }) {
  const { newCategoryInput, handleChangeCreateCategory, handleCreateCategory } =
    useCreateCategory(setCategories, closeModal);

  return (
    <BaseModal
      isOpen={true}
      onClose={closeModal}
      onSubmit={handleCreateCategory}
      title="Crear categoría"
      footer={
        <div className="bm-footer__actions">
          <button type="button" className="bm-btn bm-btn--secondary" onClick={closeModal}>
            Cancelar
          </button>
          <button type="submit" className="bm-btn bm-btn--primary">
            Crear
          </button>
        </div>
      }
    >
      <div className="category-modal_body">
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            placeholder="Nombre de la categoría"
            value={newCategoryInput.name}
            onChange={handleChangeCreateCategory}
          />
        </label>
      </div>
    </BaseModal>
  );
}

export default CreateCategoryModal;
