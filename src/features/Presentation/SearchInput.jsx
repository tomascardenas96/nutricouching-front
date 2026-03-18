import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { CiSearch } from "react-icons/ci";
import useFilterProfessionals from "../professional/hooks/useFilterProfessionals";
import ResultCard from "./ResultCard";
import { IoIosArrowForward } from "react-icons/io";
import "./SearchInput.css";
import { Link } from "react-router-dom";

function SearchInput({ searchTerm, setSearchTerm }) {
  const [isFocused, setIsFocused] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const containerRef = useRef(null);

  const {
    data,
    isError,
    isFetching,
    handleChangeFilterProfessionals,
    handleKeyDown,
  } = useFilterProfessionals(searchTerm, setSearchTerm);

  const showDropdown = isFocused && searchTerm?.length > 0;
  const noResults = !isFetching && (data === undefined || data.length === 0);

  useEffect(() => {
    if (showDropdown && containerRef.current) {
      const inputRect = containerRef.current.getBoundingClientRect();
      const mainBg = document.querySelector(".main-background");
      const mainRect = mainBg ? mainBg.getBoundingClientRect() : { top: 0, left: 0 };
      setDropdownStyle({
        position: "absolute",
        top: inputRect.bottom - mainRect.top + 6,
        left: inputRect.left - mainRect.left,
        width: inputRect.width,
        zIndex: 500,
      });
    }
  }, [showDropdown]);

  return (
    <>
      <input
        ref={containerRef}
        type="text"
        placeholder="¿Que estás buscando?"
        className="filter-professionals_input"
        onChange={handleChangeFilterProfessionals}
        value={searchTerm}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 150)}
      />

      <div className="search-icon" onClick={handleKeyDown}>
        <CiSearch />
      </div>

      {showDropdown &&
        createPortal(
          <ul className="professionals-filter_results-modal" style={dropdownStyle}>
            {isError ? (
              <li className="results-modal">Ha ocurrido un error.</li>
            ) : isFetching || noResults ? (
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
              <Link to="/professionals">
                Ver todos los profesionales{" "}
                <IoIosArrowForward className="arrow" />
              </Link>
            </p>
          </ul>,
          document.querySelector(".main-background") || document.body
        )}
    </>
  );
}

export default SearchInput;
