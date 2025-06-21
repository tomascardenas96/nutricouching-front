import React from "react";
import useFilterProfessionalsByQuery from "../../hooks/useFilterProfessionalsByQuery";

function FilteredProfessionalsSection({ filters }) {
  const { professionals, isError, isLoading, error } =
    useFilterProfessionalsByQuery(filters);

    console.log(professionals)

  return (
    <div>
      {professionals?.map((professional) => (
        <div>
          <p>{professional.fullname}</p>
        </div>
      ))}
    </div>
  );
}

export default FilteredProfessionalsSection;
