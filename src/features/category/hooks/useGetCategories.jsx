import { useEffect, useState } from "react";
import { HOST } from "../../../api/data";

function useGetCategories() {
  const [categories, setCategories] = useState([]);
  const [areCategoriesLoading, setAreCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await fetch(`${HOST}/category`);

      if (!response.ok) {
        throw new Error("Error getting categories");
      }

      const data = await response.json();

      setCategories(data);
    } catch (error) {
      setCategoriesError(error);
    } finally {
      setAreCategoriesLoading(false);
    }
  };

  return { categories, areCategoriesLoading, categoriesError };
}

export default useGetCategories;
