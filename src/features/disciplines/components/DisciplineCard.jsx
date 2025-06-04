import "./DisciplineCard.css";
import { CiApple } from "react-icons/ci";
import { PiBrainLight } from "react-icons/pi";
import { GiStrongMan } from "react-icons/gi";
import { TbMessage2Heart } from "react-icons/tb";
import { TbBrandCouchdb } from "react-icons/tb";

function DisciplineCard({ name }) {
  return (
    <div className="discipline-card">
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
    </div>
  );
}

export default DisciplineCard;
