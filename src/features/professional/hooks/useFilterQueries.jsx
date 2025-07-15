import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function useFilterQueries() {
  const navigate = useNavigate();
  const location = useLocation();

  const [filters, setFilters] = useState({
    name: "",
    category: "",
    specialty: "",
  });

  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    setFilters({
      name: params.get("name") || "",
      category: params.get("category") || "",
      specialty: params.get("specialty") || "",
    });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.category)
      params.set("category", filters.category.toLowerCase());
    if (filters.specialty)
      params.set("specialty", filters.specialty.toLowerCase());
    if (filters.name) params.set("name", filters.name.toLowerCase());

    navigate(`/filter/professionals?${params.toString()}`, { replace: true });
  }, [filters]);

  const handleChange = (key, value, id) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (key === "category") {
      setSelectedCategory(id);
    }
  };

  const clearQueries = () => {
    setFilters({
      name: "",
      category: "",
      specialty: "",
    });
  };

  return { handleChange, filters, clearQueries, selectedCategory };
}

export default useFilterQueries;
