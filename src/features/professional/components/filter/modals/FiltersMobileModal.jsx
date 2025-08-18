import FiltersList from "../FiltersList";
import "./FiltersMobileModal.css";

function FiltersMobileModal({
  onClose,
  categories,
  handleChange,
  handleSelectCategory,
  specialties,
  filters,
}) {
  return (
    <div className="filters-mobile-modal_container" onClick={onClose}>
      <div className="modal-opened" onClick={(e) => e.stopPropagation()}>
        <FiltersList
          categories={categories}
          handleChange={handleChange}
          handleSelectCategory={handleSelectCategory}
          specialties={specialties}
          filters={filters}
        />
      </div>
    </div>
  );
}

export default FiltersMobileModal;
