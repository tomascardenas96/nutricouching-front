import React from "react";
import { CiSearch } from "react-icons/ci";
import "./Filters.css";
import FiltersList from "./FiltersList";
import useGetSpecialtiesByCategory from "../../../specialties/hooks/useGetSpecialtiesByCategory";
import useGetCategories from "../../../category/hooks/useGetCategories";
import useSelectCategoryFilter from "../../../specialties/hooks/useSelectCategoryFilter";

function Filters({ clearQueries, filters, handleChange }) {
  const { categories } = useGetCategories();

  const { selectedCategory, setSelectedCategory, handleSelectCategory } =
    useSelectCategoryFilter();

  const { specialties, specialtiesLoading, specialtiesError } =
    useGetSpecialtiesByCategory(
      selectedCategory,
      setSelectedCategory,
      categories,
      filters
    );

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
