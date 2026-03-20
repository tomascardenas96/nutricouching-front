import BaseModal from "../../../../../../common/components/BaseModal";
import useGetCategories from "../../../../../category/hooks/useGetCategories";
import useCreateSpecialty from "../../../../hooks/useCreateSpecialty";
import "./CreateSpecialtyModal.css";

function CreateSpecialtyModal({ closeModal, setSpecialties }) {
  const { categories } = useGetCategories();

  const {
    handleChangeCreateSpecialty,
    handleCreateSpecialty,
    newSpecialtyInput,
  } = useCreateSpecialty(setSpecialties, closeModal);

  return (
    <BaseModal
      isOpen={true}
      onClose={closeModal}
      onSubmit={handleCreateSpecialty}
      title="Crear especialidad"
      footer={
        <div className="bm-footer__actions">
          <button
            type="button"
            className="bm-btn bm-btn--secondary"
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button type="submit" className="bm-btn bm-btn--primary">
            Crear
          </button>
        </div>
      }
    >
      <div className="specialties-modal_body">
        <div>
          <label htmlFor="name">
            <input
              type="text"
              name="name"
              onChange={handleChangeCreateSpecialty}
              placeholder="Nombre de la especialidad"
            />
          </label>

          <label htmlFor="categoryId">
            <select
              name="categoryId"
              onChange={handleChangeCreateSpecialty}
              value={newSpecialtyInput.categoryId}
            >
              <option value="">Seleccione una categoria</option>
              {categories.map((category) => (
                <option
                  key={`service-${category.categoryId}`}
                  value={category.categoryId}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </BaseModal>
  );
}

export default CreateSpecialtyModal;
