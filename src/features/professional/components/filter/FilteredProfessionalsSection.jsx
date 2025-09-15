import React from "react";
import { MdOutlineSearchOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useFilterProfessionalsByQuery from "../../hooks/useFilterProfessionalsByQuery";
import "./FilteredProfessionalsSection.css";
import ProfessionalCardLoading from "./loading/ProfessionalCardLoading";
import ProfessionalFilterResultCard from "./ProfessionalFilterResultCard";
import useGetProfessionals from "../../hooks/useGetProfessionals";

function FilteredProfessionalsSection({ filters }) {
  const { professionals, isError, isLoading, error } =
    useFilterProfessionalsByQuery(filters);

  const {
    professionals: allProfessionals,
    professionalsLoading: allProfessionalsLoading,
    professionalsError: allProfessionalsError,
  } = useGetProfessionals();

  const navigate = useNavigate();
  const noFilterSelected = Object.values(filters).every(
    (value) => value === ""
  );

  return (
    <div className="filtered-professionals_results">
      {isLoading ? (
        new Array(4)
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
        allProfessionals?.map((professional) => (
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
      ) : (
        <p className="no-results">
          <MdOutlineSearchOff className="search-icon" /> No hay coincidencias.
        </p>
      )}
    </div>
  );
}

export default FilteredProfessionalsSection;
