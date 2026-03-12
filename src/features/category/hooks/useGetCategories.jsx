import { useEffect, useState } from "react";
import apiClient from "../../auth/api/apiClient";

function useGetCategories() {
  const [categories, setCategories] = useState([]);
  const [areCategoriesLoading, setAreCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const { data } = await apiClient.get("/category");

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
