import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CiSearch } from "react-icons/ci";
import FilteredProfessionalsSection from "../components/filter/FilteredProfessionalsSection";
import useFilterQueries from "../hooks/useFilterQueries";
import "./ProfessionalsFilterPage.css";
import useGetSpecialtiesByCategory from "../../specialties/hooks/useGetSpecialtiesByCategory";
import useSelectCategoryFilter from "../../specialties/hooks/useSelectCategoryFilter";
import Filters from "../components/filter/Filters";
import FiltersMobile from "../components/filter/mobile/FiltersMobile";

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
          <Filters
            clearQueries={clearQueries}
            filters={filters}
            handleChange={handleChange}
            categories={categories}
            handleSelectCategory={handleSelectCategory}
            specialties={specialties}
          />

          <FiltersMobile
            clearQueries={clearQueries}
            filters={filters}
            handleChange={handleChange}
            categories={categories}
            handleSelectCategory={handleSelectCategory}
            specialties={specialties}
          />
        </div>

        <div className="filter-page-results">
          <FilteredProfessionalsSection filters={filters} />
        </div>
      </QueryClientProvider>
    </div>
  );
}

export default ProfessionalsFilterPage;
