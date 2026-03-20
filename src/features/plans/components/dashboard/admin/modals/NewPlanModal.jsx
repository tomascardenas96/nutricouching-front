import BaseModal from "../../../../../../common/components/BaseModal";
import useCreatePlan from "../../../../hooks/useCreatePlan";

function NewPlanModal({ setPlans, handleAddPlanModal }) {
  const {
    handleCreatePlan,
    handleChangeInput,
    handleChangePdf,
    handleChangeImage,
    createPlanInput,
  } = useCreatePlan(setPlans, handleAddPlanModal);

  return (
    <BaseModal
      isOpen={true}
      onClose={handleAddPlanModal}
      onSubmit={handleCreatePlan}
      title="Nuevo Plan"
      footer={
        <div className="bm-footer__actions">
          <button
            type="button"
            className="bm-btn bm-btn--secondary"
            onClick={handleAddPlanModal}
          >
            Cancelar
          </button>
          <button type="submit" className="bm-btn bm-btn--primary">
            Crear
          </button>
        </div>
      }
    >
      <div className="plan-modal_fields">
        <label htmlFor="title">
          Titulo
          <input
            type="text"
            name="title"
            onChange={handleChangeInput}
            value={createPlanInput.title}
          />
        </label>

        <label htmlFor="description">
          Descripcion
          <input
            type="text"
            name="description"
            onChange={handleChangeInput}
            value={createPlanInput.description}
          />
        </label>

        <label htmlFor="shortDescription">
          Descripcion corta
          <input
            type="text"
            name="shortDescription"
            onChange={handleChangeInput}
            value={createPlanInput.shortDescription}
          />
        </label>

        <label htmlFor="price">
          Precio
          <input
            type="text"
            name="price"
            onChange={handleChangeInput}
            value={createPlanInput.price}
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
      </div>
    </BaseModal>
  );
}

export default NewPlanModal;
