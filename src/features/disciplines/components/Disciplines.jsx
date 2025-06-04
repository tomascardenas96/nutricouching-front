import DisciplineCard from "./DisciplineCard";
import "./Disciplines.css";

function Disciplines() {
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
          <DisciplineCard
            name={discipline.name}
            key={`discipline-${discipline.name}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Disciplines;
