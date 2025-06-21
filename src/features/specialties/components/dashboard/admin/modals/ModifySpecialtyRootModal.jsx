import ModalWindow from "../../../../../../common/components/dashboard/ModalWindow";
import useGetCategories from "../../../../../category/hooks/useGetCategories";
import useModifySpecialty from "../../../../hooks/useModifySpecialty";
import "./ModifySpecialtyRootModal.css";

function ModifySpecialtyRootModal({
  selectedSpecialty,
  setSpecialties,
  handleCloseModifyModal,
}) {
  const {
    handleChangeModifySpecialty,
    handleSubmitModifySpecialty,
    modifySpecialtyInput,
  } = useModifySpecialty(
    selectedSpecialty,
    setSpecialties,
    handleCloseModifyModal
  );

  const { categories, areCategoriesLoading, categoriesError } =
    useGetCategories();

  return (
    <ModalWindow
      onClose={handleCloseModifyModal}
      onSubmit={handleSubmitModifySpecialty}
      title="Modificar Especialidad"
    >
      <div className="modify-specialty_modal">
        <label htmlFor="name">
          Nombre de especialidad
          <input
            type="text"
            name="name"
            onChange={handleChangeModifySpecialty}
            value={modifySpecialtyInput.name}
          />
        </label>

        <label htmlFor="categoryId">
          Categoria
          <select name="categoryId" onChange={handleChangeModifySpecialty}>
            <option value={selectedSpecialty.categorycategoryId}>
              {selectedSpecialty.category.name}
            </option>
            {categories?.map(
              (category) =>
                selectedSpecialty.category.categoryId !==
                  category.categoryId && (
                  <option
                    key={`category-${category.categoryId}`}
                    value={category.categoryId}
                  >
                    {category.name}
                  </option>
                )
            )}
          </select>
        </label>

        <button
          disabled={
            selectedSpecialty.name === modifySpecialtyInput.name &&
            selectedSpecialty.category.categoryId ===
              modifySpecialtyInput.categoryId
          }
        >
          Enviar
        </button>
      </div>
    </ModalWindow>
  );
}

export default ModifySpecialtyRootModal;
