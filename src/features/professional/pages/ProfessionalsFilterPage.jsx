import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FilteredProfessionalsSection from "../components/filter/FilteredProfessionalsSection";
import Filters from "../components/filter/Filters";
import FiltersMobile from "../components/filter/mobile/FiltersMobile";
import useFilterQueries from "../hooks/useFilterQueries";
import "./ProfessionalsFilterPage.css";
import { Helmet } from "react-helmet-async";

function ProfessionalsFilterPage() {
  const queryClient = new QueryClient();

  const { filters, handleChange, clearQueries } = useFilterQueries();

  return (
    <div className="professionals-filter-page">
      <Helmet>
        <title>Filtrar profesionales | Cohesiva Salud</title>
      </Helmet>

      <QueryClientProvider client={queryClient}>
        <div className="filter-page_left">
          <Filters
            clearQueries={clearQueries}
            filters={filters}
            handleChange={handleChange}
          />

          <FiltersMobile
            clearQueries={clearQueries}
            filters={filters}
            handleChange={handleChange}
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
