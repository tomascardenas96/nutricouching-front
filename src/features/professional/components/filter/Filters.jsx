import React from "react";
import { CiSearch } from "react-icons/ci";
import "./Filters.css";
import FiltersList from "./FiltersList";

function Filters({
  clearQueries,
  filters,
  handleChange,
  categories,
  handleSelectCategory,
  specialties,
}) {
  return (
    <form className="container" onSubmit={(e) => e.preventDefault()}>
      <div className="block-container">
        <p className="path-info">
          Inicio / Filtro / <span>Profesionales</span>
        </p>
        <div className="title">
          <h1>Profesionales </h1> <span>20 resultados</span>
        </div>

        <h2>
          Filtros{" "}
          <span
            onClick={clearQueries}
            className={`${
              filters.name === "" &&
              filters.category === "" &&
              filters.specialty === "" &&
              "disabled-delete-btn"
            }`}
          >
            Eliminar filtros
          </span>
        </h2>
      </div>

      <hr />

      <div className="block-container name-field">
        <h3>NOMBRE</h3>
        <input
          type="text"
          placeholder="Ingrese un nombre"
          name="name"
          onChange={(e) => handleChange("name", e.target.value)}
          value={filters.name}
        />
        <div className="search-icon">
          <CiSearch />
        </div>
      </div>

      <hr />

      <FiltersList
        categories={categories}
        handleChange={handleChange}
        handleSelectCategory={handleSelectCategory}
        specialties={specialties}
        filters={filters}
      />
    </form>
  );
}

export default Filters;
