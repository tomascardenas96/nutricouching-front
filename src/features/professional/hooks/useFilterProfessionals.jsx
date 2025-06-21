import { useQuery } from "@tanstack/react-query";
import { HOST } from "../../../api/data";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function useFilterProfessionals(searchTerm, setSearchTerm) {
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const navigate = useNavigate();

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

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault();
      if (searchTerm.trim()) {
        navigate(
          `/filter/professionals?name=${encodeURIComponent(searchTerm)}`
        );
      }
    }
  };

  return {
    data,
    isFetching,
    isError,
    handleChangeFilterProfessionals,
    handleKeyDown,
  };
}

export default useFilterProfessionals;
