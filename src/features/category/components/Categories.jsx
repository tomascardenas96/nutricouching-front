import useGetCategories from "../hooks/useGetCategories";
import "./Categories.css";
import CategoryCard from "./CategoryCard";
import CategoriesLoader from "./loader/CategoriesLoader";

function Categories() {
  const { categories, areCategoriesLoading, categoriesError } =
    useGetCategories();

  if (areCategoriesLoading) {
    return <CategoriesLoader />;
  }

  return (
    <section className="disciplines-home">
      <div>
        {categories?.map((discipline) => (
          <CategoryCard
            key={`discipline-${discipline.name}`}
            name={discipline.name}
            isLoading={areCategoriesLoading}
          />
        ))}
      </div>
    </section>
  );
}

export default Categories;
