import { CiSearch } from "react-icons/ci";
import useFilterProfessionals from "../professional/hooks/useFilterProfessionals";
import ResultCard from "./ResultCard";
import { IoIosArrowForward } from "react-icons/io";
import "./SearchInput.css";
import { Link } from "react-router-dom";

function SearchInput({ searchTerm, setSearchTerm }) {
  const {
    data,
    isError,
    isFetching,
    handleChangeFilterProfessionals,
    handleKeyDown,
  } = useFilterProfessionals(searchTerm, setSearchTerm);

  return (
    <>
      <input
        type="text"
        placeholder="¿Que estás buscando?"
        className="filter-professionals_input"
        onChange={handleChangeFilterProfessionals}
        value={searchTerm}
        onKeyDown={handleKeyDown}
      />

      <div className="search-icon" onClick={handleKeyDown}>
        <CiSearch />
      </div>

      {searchTerm?.length > 0 && (
        <ul className="professionals-filter_results-modal">
          {isError ? (
            <li className="results-modal">Ha ocurrido un error.</li>
          ) : isFetching ? (
            <li className="results-modal">Buscando profesionales...</li>
          ) : data?.length === 0 ? (
            <li className="results-modal">No hay resultados</li>
          ) : (
            data?.map((pro) => (
              <ResultCard
                key={`professional-filtered-${pro.professionalId}`}
                image={pro.profile.picture}
                fullname={pro.fullname}
                specialties={pro.specialty}
                profilename={pro.profile.profileName}
              />
            ))
          )}

          <p className="see-all">
            <Link to="/filter/professionals">
              Ver todos los profesionales{" "}
              <IoIosArrowForward className="arrow" />
            </Link>
          </p>
        </ul>
      )}
    </>
  );
}

export default SearchInput;
