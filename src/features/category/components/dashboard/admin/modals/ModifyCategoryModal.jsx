import BaseModal from "../../../../../../common/components/BaseModal";
import useModifyCategory from "../../../../hooks/useModifyCategory";
import "./CategoryModal.css";

function ModifyCategoryModal({ selectedCategory, setCategories, closeModal }) {
  const { modifyCategoryInput, handleChangeModifyCategory, handleModifyCategory } =
    useModifyCategory(setCategories, closeModal, selectedCategory);

  return (
    <BaseModal
      isOpen={true}
      onClose={closeModal}
      onSubmit={handleModifyCategory}
      title="Editar categoría"
      footer={
        <div className="bm-footer__actions">
          <button type="button" className="bm-btn bm-btn--secondary" onClick={closeModal}>
            Cancelar
          </button>
          <button type="submit" className="bm-btn bm-btn--primary">
            Guardar
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
            value={modifyCategoryInput.name}
            onChange={handleChangeModifyCategory}
          />
        </label>
      </div>
    </BaseModal>
  );
}

export default ModifyCategoryModal;
