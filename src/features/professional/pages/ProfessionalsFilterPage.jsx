import { CiSearch } from "react-icons/ci";
import useFilterQueries from "../hooks/useFilterQueries";
import "./ProfessionalsFilterPage.css";
import { FilterProfessionalsQueryBuilder } from "../utils/queryBuilders";
import useFilterProfessionalsByQuery from "../hooks/useFilterProfessionalsByQuery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FilteredProfessionalsSection from "../components/filter/FilteredProfessionalsSection";

const categories = [
  "Nutricion",
  "Fitness",
  "Mindfulness",
  "Psicologia",
  "Coaching",
];
const specialties = ["Coach Deportivo", "Coach Ontologico"];

function ProfessionalsFilterPage() {
  const { filters, handleChange, clearQueries } = useFilterQueries();
  const queryClient = new QueryClient();

  return (
    <div className="professionals-filter-page">
      <QueryClientProvider client={queryClient}>
        <div className="filter-page_left">
          <form className="container">
            <div className="block-container">
              <p className="path-info">
                Inicio / Filtrar / <span>Profesionales</span>
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

            <div className="block-container option-fields">
              <h3>CATEGORIA</h3>
              <div className="input-items-container">
                {categories.map((category) => (
                  <div key={category}>
                    <label>
                      <input
                        type="radio"
                        name="category"
                        value={filters.category}
                        checked={
                          filters.category.toLowerCase() ===
                          category.toLowerCase()
                        }
                        onChange={(e) => handleChange("category", category)}
                      />
                      {category}
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
                {specialties?.map((specialty) => (
                  <div key={specialty}>
                    <label>
                      <input
                        type="radio"
                        name="specialty"
                        value={filters.specialty}
                        checked={
                          filters.specialty.toLowerCase() ===
                          specialty.toLowerCase()
                        }
                        onChange={(e) => handleChange("specialty", specialty)}
                      />
                      {specialty}
                      <span>N items</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>

        <div className="filter-page-results">
          <FilteredProfessionalsSection filters={filters} />
        </div>
      </QueryClientProvider>
    </div>
  );
}

export default ProfessionalsFilterPage;
