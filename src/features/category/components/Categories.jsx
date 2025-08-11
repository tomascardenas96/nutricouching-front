import useGetCategories from "../hooks/useGetCategories";
import "./Categories.css";
import CategoryCard from "./CategoryCard";

function Categories() {
  const { categories, areCategoriesLoading, categoriesError } =
    useGetCategories();

  return (
    <section className="disciplines-home">
      <div>
        {categories?.map((discipline) => (
          <CategoryCard
            name={discipline.name}
            key={`discipline-${discipline.name}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Categories;
