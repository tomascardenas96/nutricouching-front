import useCreatePlan from "../../../../hooks/useCreatePlan";
import "./NewPlanModal.css";

function NewPlanModal({ setPlans, handleAddPlanModal }) {
  const {
    handleCreatePlan,
    handleChangeInput,
    handleChangePdf,
    handleChangeImage,
    imagePreview,
    createPlanInput,
  } = useCreatePlan(setPlans, handleAddPlanModal);

  return (
    <div className="new-plan-modal_bg">
      <form onSubmit={handleCreatePlan}>
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

        <button>Crear</button>
      </form>
    </div>
  );
}

export default NewPlanModal;
