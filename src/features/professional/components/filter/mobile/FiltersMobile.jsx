import { useState } from "react";
import "./FiltersMobile.css";
import { AiOutlineFilter } from "react-icons/ai";
import { createPortal } from "react-dom";
import FiltersMobileModal from "../modals/FiltersMobileModal";

function FiltersMobile({
  clearQueries,
  filters,
  handleChange,
  categories,
  handleSelectCategory,
  specialties,
}) {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  return (
    <>
      <div className="professional-filter_mobile">
        <div className="filter-header">
          <p className="path-info">
            Inicio / Filtro / <span>Profesionales</span>
          </p>
          <div className="title">
            <h1>Profesionales </h1> <span>20 resultados</span>
          </div>
        </div>

        <div className="filter-btn">
          <input type="text" placeholder="Buscar profesionales..." />
          <button onClick={() => setIsFilterModalOpen(true)}>
            <AiOutlineFilter />
            Filtros
          </button>
        </div>
      </div>

      {isFilterModalOpen &&
        createPortal(
          <FiltersMobileModal
            categories={categories}
            handleChange={handleChange}
            handleSelectCategory={handleSelectCategory}
            specialties={specialties}
            filters={filters}
            onClose={() => setIsFilterModalOpen(false)}
          />,
          document.getElementById("root-portal")
        )}
    </>
  );
}

export default FiltersMobile;
