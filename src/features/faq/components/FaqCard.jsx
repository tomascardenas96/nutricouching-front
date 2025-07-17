import { useState } from "react";
import "./FaqCard.css";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

function FaqCard({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-card" onClick={() => setIsOpen(!isOpen)}>
      <div className="question-container">
        <p>{question}</p>
        {isOpen ? (
          <FaMinus className="plus-icon" />
        ) : (
          <FaPlus className="plus-icon" />
        )}
      </div>

      {isOpen && (
        <div className="answer-container" onClick={(e) => e.stopPropagation()}>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default FaqCard;
