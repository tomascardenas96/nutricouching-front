import useModifyPlan from "../../../../hooks/useModifyPlan";
import "./UpdatePlanModal.css";

function UpdatePlanModal({ selectedPlan, setPlans, closeModifyPlanModal }) {
  const {
    handleModifyPlan,
    modifyPlanInput,
    handleChangeInput,
    handleChangeImage,
    imagePreview,
  } = useModifyPlan(selectedPlan, closeModifyPlanModal, setPlans);

  return (
    <div className="modify-plan-modal_bg">
      <form onSubmit={handleModifyPlan}>
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

        <label htmlFor="price">
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

        <button onClick={closeModifyPlanModal}>Cerrar</button>
        <button>Modificar</button>
      </form>
    </div>
  );
}

export default UpdatePlanModal;
