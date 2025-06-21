export const FilterProfessionalsQueryBuilder = (filters) => {
  const params = new URLSearchParams();
  if (filters.name) params.append("name", filters.name.toLowerCase());
  if (filters.category)
    params.append("category", filters.category.toLowerCase());
  if (filters.specialty)
    params.append("specialty", filters.specialty.toLowerCase());
  return params.toString();
};
