import { useQuery } from "@tanstack/react-query";
import { HOST } from "../../../api/data";
import { useEffect, useState } from "react";

function useFilterProfessionals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  const searchProfessionals = async (searchTerm) => {
    const res = await fetch(
      `${HOST}/professional/filter?every=${encodeURIComponent(searchTerm)}`
    );
    return await res.json();
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data, isFetching, isError } = useQuery({
    queryKey: ["professionals", debouncedTerm],
    queryFn: () => searchProfessionals(debouncedTerm),
    enabled: debouncedTerm.length > 0,
  });

  const handleChangeFilterProfessionals = (e) => {
    const value = e.target.value.trimStart();
    setSearchTerm(value);
  };

  return {
    data,
    isFetching,
    isError,
    handleChangeFilterProfessionals,
    searchTerm,
  };
}

export default useFilterProfessionals;
