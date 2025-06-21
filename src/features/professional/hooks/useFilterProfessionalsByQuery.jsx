import { useEffect, useState } from "react";
import { HOST } from "../../../api/data";
import { useQuery } from "@tanstack/react-query";
import { FilterProfessionalsQueryBuilder } from "../utils/queryBuilders";

function useFilterProfessionalsByQuery(filters) {
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500);

    return () => clearTimeout(handler);
  }, [filters]);

  const searchProfessionals = async (filters) => {
    const query = FilterProfessionalsQueryBuilder(filters);

    const response = await fetch(`${HOST}/professional/filter?${query}`);
    if (!response.ok) throw new Error("Error getting professionals by queries");
    return response.json();
  };

  const hasSomeFilter = !!(
    debouncedFilters.name ||
    debouncedFilters.category ||
    debouncedFilters.specialty
  );

  const {
    data: professionals,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["professionals", debouncedFilters],
    queryFn: () => searchProfessionals(debouncedFilters),
    enabled: !!hasSomeFilter,
  });

  return { professionals, isError, isLoading, error };
}

export default useFilterProfessionalsByQuery;
