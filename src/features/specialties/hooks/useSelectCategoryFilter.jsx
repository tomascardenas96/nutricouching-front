import { useState } from "react";

function useSelectCategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return { selectedCategory, setSelectedCategory, handleSelectCategory };
}

export default useSelectCategoryFilter;
