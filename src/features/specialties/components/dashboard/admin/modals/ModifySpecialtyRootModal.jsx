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

  const hasChanges =
    modifySpecialtyInput.name !== selectedSpecialty?.name ||
    modifySpecialtyInput.categoryId !== selectedSpecialty?.category?.categoryId;

  return (
    <ModalWindow
      onClose={handleCloseModifyModal}
      onSubmit={handleSubmitModifySpecialty}
      title="Modificar Especialidad"
      buttonText="Guardar"
      isButtonEnabled={hasChanges}
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
          <select
            name="categoryId"
            value={modifySpecialtyInput.categoryId}
            onChange={handleChangeModifySpecialty}
          >
            {categories?.map((category) => (
              <option
                key={`category-${category?.categoryId}`}
                value={category?.categoryId}
              >
                {category?.name}
              </option>
            ))}
          </select>
        </label>
      </div>
    </ModalWindow>
  );
}

export default ModifySpecialtyRootModal;
