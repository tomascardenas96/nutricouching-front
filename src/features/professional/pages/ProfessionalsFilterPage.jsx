import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CiSearch } from "react-icons/ci";
import FilteredProfessionalsSection from "../components/filter/FilteredProfessionalsSection";
import useFilterQueries from "../hooks/useFilterQueries";
import "./ProfessionalsFilterPage.css";
import useGetSpecialtiesByCategory from "../../specialties/hooks/useGetSpecialtiesByCategory";
import useSelectCategoryFilter from "../../specialties/hooks/useSelectCategoryFilter";

const categories = [
  {
    categoryId: "0b39debd-b730-4d94-a3c1-3f2363f2c35b",
    name: "Nutricion",
  },
  {
    categoryId: "38e3814f-f168-4712-adb1-5a7ada84103e",
    name: "Fitness",
  },
  {
    categoryId: "8131bced-58b1-4848-8912-a4a234ce8ce3",
    name: "Mindfulness",
  },
  {
    categoryId: "a75f928d-60e7-4d57-9cae-dd24f149b57b",
    name: "Psicologia",
  },
  {
    categoryId: "6c3dd98e-797f-452d-b626-d990c1560adb",
    name: "Coaching",
  },
];

function ProfessionalsFilterPage() {
  const queryClient = new QueryClient();

  const { selectedCategory, setSelectedCategory, handleSelectCategory } =
    useSelectCategoryFilter();

  const { filters, handleChange, clearQueries } = useFilterQueries();

  const { specialties, specialtiesLoading, specialtiesError } =
    useGetSpecialtiesByCategory(
      selectedCategory,
      setSelectedCategory,
      categories,
      filters
    );

  return (
    <div className="professionals-filter-page">
      <QueryClientProvider client={queryClient}>
        <div className="filter-page_left">
          <form className="container" onSubmit={(e) => e.preventDefault()}>
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
                {specialties.length === 0 ? (
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
                          onChange={(e) =>
                            handleChange("specialty", specialty.name)
                          }
                        />
                        {specialty.name}
                        <span>N items</span>
                      </label>
                    </div>
                  ))
                )}
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
