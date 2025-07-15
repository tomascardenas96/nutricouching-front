import { useEffect, useState } from "react";
import { HOST } from "../../../api/data";

function useGetSpecialtiesByCategory(
  category,
  setSelectedCategory,
  categories,
  filters
) {
  const [specialties, setSpecialties] = useState([]);
  const [specialtiesLoading, setSpecialtiesLoading] = useState(true);
  const [specialtiesError, setSpecialtiesError] = useState(false);

  useEffect(() => {
    const getSpecialties = async () => {
      try {
        const response = await fetch(`${HOST}/specialty/category/${category}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(
            "Error al obtener las especialidades por ID de categoria"
          );
        }

        const data = await response.json();

        setSpecialties(data);
      } catch (error) {
        setSpecialtiesError(error);
      } finally {
        setSpecialtiesLoading(false);
      }
    };

    if (category) {
      getSpecialties();
    }
  }, [category]);

  // Filters.category me da el nombre de la categoria pero yo necesito su id.
  // Con este metodo voy a obtener el objeto completo y extraer su ID para luego darselo como valor a la variable selectedCategory.
  // NOTA: Esta variable es quien va a mostrar las especialidades de manera dinamica dependiendo la catgoria seleccionada. Sin este efecto
  // no se obtenian las especialidades al recargar la pagina.
  useEffect(() => {
    const getCategoryObject = categories.find(
      (category) =>
        category.name.toLowerCase() === filters.category.toLowerCase()
    );

    if (getCategoryObject) {
      setSelectedCategory(getCategoryObject.categoryId);
    }

    const areFiltersEmpty = Object.values(filters).every((a) => a === "");

    if (areFiltersEmpty) {
      setSpecialties([]);
    }
  }, [filters]);

  return {
    specialties,
    specialtiesLoading,
    specialtiesError,
  };
}

export default useGetSpecialtiesByCategory;
