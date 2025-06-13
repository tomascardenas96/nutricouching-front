import { CiSearch } from "react-icons/ci";
import useFilterProfessionals from "../professional/hooks/useFilterProfessionals";
import "./SearchInput.css";
import ResultCard from "./ResultCard";

function SearchInput() {
  const {
    data,
    isError,
    isFetching,
    handleChangeFilterProfessionals,
    searchTerm,
  } = useFilterProfessionals();

  return (
    <>
      <input
        type="text"
        placeholder="¿Que estás buscando?"
        className="filter-professionals_input"
        onChange={handleChangeFilterProfessionals}
        value={searchTerm}
      />
      <div className="search-icon">
        <CiSearch />
      </div>
      {searchTerm.length > 0 && (
        <ul className="professionals-filter_results-modal">
          {isFetching ? (
            <p className="results-modal">Buscando profesionales...</p>
          ) : data?.length > 0 ? (
            data?.map((pro) => (
              <ResultCard
                key={`professional-filtered-${pro.professionalId}`}
                image={pro.profile.picture}
                fullname={pro.fullname}
                specialties={pro.specialty}
              />
            ))
          ) : (
            <li className="results-modal">No hay resultados</li>
          )}

          {isError && <li className="results-modal">Ha ocurrido un error.</li>}
        </ul>
      )}
    </>
  );
}

export default SearchInput;
