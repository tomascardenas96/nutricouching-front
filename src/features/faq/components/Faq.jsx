import "./Faq.css";
import { faq } from "../data/faq";
import FaqCard from "./FaqCard";

function Faq() {
  return (
    <div className="faq-container">
      <div className="image-faq">
        <img src="/src/public/assets/FAQ.png" alt="faq image" />
      </div>

      <div className="faq-questions">
        <div className="questions-header">
          <h1>Preguntas Frecuentes</h1>
          <p>Consultas que podrias tener sobre nuestro servicio y productos</p>
        </div>

        <div className="questions-body">
          {faq.map((f) => (
            <FaqCard key={f.id} question={f.question} answer={f.answer} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Faq;
