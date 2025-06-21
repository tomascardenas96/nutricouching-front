import { CiApple } from "react-icons/ci";
import { GiStrongMan } from "react-icons/gi";
import { PiBrainLight } from "react-icons/pi";
import { TbBrandCouchdb, TbMessage2Heart } from "react-icons/tb";
import "./CategoryCard.css";

function CategoryCard({ name }) {
  return (
    <div className="discipline-card">
      <a href={`/filter/professionals?category=${name.toLowerCase()}`}>
        <div className="icon-container">
          <div>
            {name === "Nutricion" && <CiApple />}
            {name === "Mindfulness" && <PiBrainLight />}
            {name === "Fitness" && <GiStrongMan />}
            {name === "Coaching" && <TbMessage2Heart />}
            {name === "Psicologia" && <TbBrandCouchdb />}
          </div>
        </div>
        <p>{name}</p>
      </a>
    </div>
  );
}

export default CategoryCard;
