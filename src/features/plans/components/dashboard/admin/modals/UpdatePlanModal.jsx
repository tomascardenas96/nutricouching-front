import BaseModal from "../../../../../../common/components/BaseModal";
import useModifyPlan from "../../../../hooks/useModifyPlan";

function UpdatePlanModal({ selectedPlan, setPlans, closeModifyPlanModal }) {
  const {
    handleModifyPlan,
    modifyPlanInput,
    handleChangeInput,
    handleChangeImage,
  } = useModifyPlan(selectedPlan, closeModifyPlanModal, setPlans);

  return (
    <BaseModal
      isOpen={true}
      onClose={closeModifyPlanModal}
      onSubmit={handleModifyPlan}
      title="Modificar Plan"
      footer={
        <div className="bm-footer__actions">
          <button
            type="button"
            className="bm-btn bm-btn--secondary"
            onClick={closeModifyPlanModal}
          >
            Cancelar
          </button>
          <button type="submit" className="bm-btn bm-btn--primary">
            Modificar
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
            value={modifyPlanInput.title}
          />
        </label>

        <label htmlFor="description">
          Descripcion
          <input
            type="text"
            name="description"
            onChange={handleChangeInput}
            value={modifyPlanInput.description}
          />
        </label>

        <label htmlFor="shortDescription">
          Resumen
          <input
            type="text"
            name="shortDescription"
            onChange={handleChangeInput}
            value={modifyPlanInput.shortDescription}
          />
        </label>

        <label htmlFor="price">
          Precio
          <input
            type="text"
            name="price"
            onChange={handleChangeInput}
            value={modifyPlanInput.price}
          />
        </label>

        <label htmlFor="isOffer">
          ¿Esta en oferta?
          <select
            name="isOffer"
            onChange={handleChangeInput}
            value={modifyPlanInput.isOffer}
          >
            <option value="">Seleccione una opcion</option>
            <option value="false">No</option>
            <option value="true">Si</option>
          </select>
        </label>

        <label htmlFor="image">
          Imagen
          <input type="file" name="image" onChange={handleChangeImage} />
        </label>
      </div>
    </BaseModal>
  );
}

export default UpdatePlanModal;
