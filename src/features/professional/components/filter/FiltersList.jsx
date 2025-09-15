import "./FiltersList.css";

function FiltersList({
  categories,
  handleChange,
  handleSelectCategory,
  specialties,
  filters,
}) {

  return (
    <>
      <div className="block-container option-fields">
        <h3>CATEGORIA</h3>
        <div className="input-items-container">
          {categories?.map((category) => (
            <div key={category.categoryId}>
              <label>
                <input
                  type="radio"
                  name="category"
                  value={category.categoryId}
                  checked={
                    filters.category.toLowerCase() ===
                    category.name.toLowerCase()
                  }
                  onChange={(e) => {
                    handleChange("category", category.name);
                    handleSelectCategory(e.target.value);
                  }}
                />
                {category.name}
                <span>N items</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="block-container option-fields">
        <h3>ESPECIALIDAD</h3>
        <div className="input-items-container">
          {specialties?.length === 0 ? (
            <p>Seleccione una categoria</p>
          ) : (
            specialties?.map((specialty) => (
              <div key={specialty.specialtyId}>
                <label>
                  <input
                    type="radio"
                    name="specialty"
                    value={filters.specialty}
                    checked={
                      filters.specialty.toLowerCase() ===
                      specialty.name.toLowerCase()
                    }
                    onChange={(e) => handleChange("specialty", specialty.name)}
                  />
                  {specialty.name}
                  <span>N items</span>
                </label>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default FiltersList;
