import ServiceCard from "./ServicesCard";
import "./Services.css";
import { FaPlay } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";
import { IoNutritionOutline } from "react-icons/io5";
import { RiMentalHealthLine } from "react-icons/ri";
import { RiFootprintFill } from "react-icons/ri";

function Services() {
  return (
    <div className="services">
      <div className="services-section">
        <div className="decoration-line"></div>
        <h1>
          Nuestros servicios disponibles, donde podras obtener un asesoramiento
          completo.
        </h1>
      </div>
      <div className="services-list">
        <ServiceCard
          image={
            "https://www.adherencia-cronicidad-pacientes.com/wp-content/uploads/2020/03/Recurso_comida_saludable-scaled.jpg"
          }
          color="#DCB8CB"
          title={"COUCHING"}
          description={` Mejora tu desarrollo personal y profesional con sesiones de
              couching personalizadas. Descubre tus fortalezas, supera tus
              limitaciones y alcanza tus objetivos con la guía de nuestros
              expertos.`}
          icon={<GiWeightLiftingUp />}
        />
        <ServiceCard
          image={
            "https://www.instacart.com/company/wp-content/uploads/2021/10/meal-plan-paper.jpg"
          }
          color={"#7F96FF"}
          title={"PLAN DE ALIMENTACION"}
          description={`Recibe un plan de alimentación equilibrado y adaptado a tus
          necesidades. Nuestra asesoría nutricional te ayudará a mantener
          una dieta saludable y alcanzar tus metas de bienestar.`}
          icon={<IoNutritionOutline />}
        />
        <ServiceCard
          image={
            "https://living.life.edu/wp-content/uploads/2021/12/slice-brain-food-dec8.png"
          }
          color={"#55D6BE"}
          title={"PLAN INTELIGENTE"}
          description={`Optimiza tu bienestar con nuestro plan inteligente, diseñado para
          obtener resultados efectivos. Combina estrategias personalizadas y
          seguimiento constante para mejorar tu calidad de vida.`}
          icon={<RiMentalHealthLine />}
        />
        <ServiceCard
          image={
            "https://www.heart.org/-/media/Images/Healthy-Living/Healthy-Eating/Superfoods.png"
          }
          color={"#FFEFBD"}
          title={"ASESORAMIENTO CONTINUO"}
          description={`Accede a soporte y guía constante para alcanzar tus metas de
          manera eficaz. Nuestro equipo de profesionales estará contigo en
          cada paso, brindándote el apoyo necesario para triunfar.`}
          icon={<RiFootprintFill />}
        />
      </div>
    </div>
  );
}

export default Services;

{
  /* <div className="item left-item">
          <div className="services-img">
            <img src="../../../src/assets/a.jpg" alt="" />
            <FaPlay className="play-btn" />
          </div>
          <div className="services-description">
            <h2>COUCHING</h2>
            <p>
              Mejora tu desarrollo personal y profesional con sesiones de
              couching personalizadas. Descubre tus fortalezas, supera tus
              limitaciones y alcanza tus objetivos con la guía de nuestros
              expertos.
            </p>

            <button>Conocer mas</button>
          </div>
        </div>

        <div className="item right-item">
          <div className="services-description">
            <h2>PLAN DE ALIMENTACION</h2>
            <p>
              Recibe un plan de alimentación equilibrado y adaptado a tus
              necesidades. Nuestra asesoría nutricional te ayudará a mantener
              una dieta saludable y alcanzar tus metas de bienestar.
            </p>

            <button>Conocer mas</button>
          </div>
          <div className="services-img">
            <img src="../../../src/assets/b.jpg" alt="" />
            <FaPlay className="play-btn" />
          </div>
        </div>

        <div className="item left-item">
          <div className="services-img">
            <img src="../../../src/assets/c.jpg" alt="" />
            <FaPlay className="play-btn" />
          </div>
          <div className="services-description">
            <h2>PLAN INTELIGENTE</h2>
            <p>
              Optimiza tu bienestar con nuestro plan inteligente, diseñado para
              obtener resultados efectivos. Combina estrategias personalizadas y
              seguimiento constante para mejorar tu calidad de vida.
            </p>

            <button>Conocer mas</button>
          </div>
        </div>

        <div className="item right-item">
          <div className="services-description">
            <h2>ASESORAMIENTO CONTINUO</h2>
            <p>
              Accede a soporte y guía constante para alcanzar tus metas de
              manera eficaz. Nuestro equipo de profesionales estará contigo en
              cada paso, brindándote el apoyo necesario para triunfar.
            </p>

            <button className="">Conocer mas</button>
            <button className="">Solicitar</button>
          </div>
          <div className="services-img">
            <img src="../../../src/assets/a.jpg" alt="" />
            <FaPlay className="play-btn" />
          </div>
        </div> */
}
