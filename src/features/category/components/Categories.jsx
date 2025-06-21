import CategoryCard from "./CategoryCard";
import "./Categories.css";

function Categories() {
  const disciplines = [
    { name: "Nutricion", icon: "nutricion" },
    { name: "Mindfulness", icon: "mindfulness" },
    { name: "Fitness", icon: "fitness" },
    { name: "Coaching", icon: "coaching" },
    { name: "Psicologia", icon: "psicologia" },
  ];

  return (
    <section className="disciplines-home">
      <div>
        {disciplines?.map((discipline) => (
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
