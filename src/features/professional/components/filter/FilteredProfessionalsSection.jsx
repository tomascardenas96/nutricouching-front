import React from "react";
import { MdOutlineSearchOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useFilterProfessionalsByQuery from "../../hooks/useFilterProfessionalsByQuery";
import "./FilteredProfessionalsSection.css";
import ProfessionalCardLoading from "./loading/ProfessionalCardLoading";
import ProfessionalFilterResultCard from "./ProfessionalFilterResultCard";

function FilteredProfessionalsSection({ filters }) {
  const { professionals, isError, isLoading, error } =
    useFilterProfessionalsByQuery(filters);

  const navigate = useNavigate();
  const noFilterSelected = Object.values(filters).every(
    (value) => value === ""
  );

  return (
    <div className="filtered-professionals_results">
      {isLoading ? (
        new Array(12)
          .fill(null)
          .map((_loader, idx) => (
            <ProfessionalCardLoading key={`loader-${idx}`} />
          ))
      ) : professionals?.length > 0 ? (
        professionals?.map((professional) => (
          <div
            key={`professional-${professional.professionalId}`}
            onClick={() =>
              navigate(`/profile/${professional.profile.profileName}`)
            }
          >
            <ProfessionalFilterResultCard
              fullname={professional.fullname}
              image={professional.profile.picture}
              specialties={professional.specialty}
            />
          </div>
        ))
      ) : noFilterSelected ? (
        <p className="no-filters-selected">
          <MdOutlineSearchOff className="search-icon" /> Ingrese un filtro para
          buscar profesionales
        </p>
      ) : (
        <p className="no-results">
          <MdOutlineSearchOff className="search-icon" /> No hay coincidencias.
        </p>
      )}
    </div>
  );
}

export default FilteredProfessionalsSection;
