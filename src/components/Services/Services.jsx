import "./Services.css";
import ServiceCard from "./ServicesCard";
import { GiWeightLiftingUp } from "react-icons/gi";
import { IoNutritionOutline } from "react-icons/io5";
import { RiMentalHealthLine, RiFootprintFill } from "react-icons/ri";

function Services() {
  return (
    <div className="categories-menu">
      <div className="title">
        <h1>
          Nuestros servicios disponibles, donde podrás obtener un asesoramiento
          completo.
        </h1>
      </div>
      <div className="categories">
        <div className="services-list">
          <ServiceCard
            image={
              "https://www.adherencia-cronicidad-pacientes.com/wp-content/uploads/2020/03/Recurso_comida_saludable-scaled.jpg"
            }
            color="#DCB8CB"
            title={"COACHING"}
            description={` Mejora tu desarrollo personal y profesional con sesiones de
              coaching personalizadas.`}
            icon={<GiWeightLiftingUp />}
          />
          <ServiceCard
            image={
              "https://www.instacart.com/company/wp-content/uploads/2021/10/meal-plan-paper.jpg"
            }
            color={"#8499B1"}
            title={"GUÍA ALIMENTARIA PERSONALIZADA"}
            description={`Recibe una guía adaptada a tus necesidades. Nuestra asesoría profesional te ayudará a crear hábitos saludables y alcanzar el bienestar.`}
            icon={<IoNutritionOutline />}
            className="food-guide_card"
          />
          <ServiceCard
            image={
              "https://living.life.edu/wp-content/uploads/2021/12/slice-brain-food-dec8.png"
            }
            color={"#93C0A4"}
            title={"PLAN INTELIGENTE"}
            description={`Optimiza tu bienestar con nuestro plan inteligente, diseñado para obtener resultados efectivos.`}
            icon={<RiMentalHealthLine />}
          />
          <ServiceCard
            image={
              "https://www.heart.org/-/media/Images/Healthy-Living/Healthy-Eating/Superfoods.png"
            }
            color={"#DECDF5"}
            title={"ASESORAMIENTO CONTINUO"}
            description={`Accede a soporte y guía constante para alcanzar tus metas de manera eficaz. Nuestro equipo de profesionales estará contigo en cada paso.`}
            icon={<RiFootprintFill />}
          />
        </div>
      </div>
    </div>
  );
}

export default Services;
