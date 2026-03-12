import "./SectionTitle.css";
import Cherry from "/assets/icons/cherry.svg";
import Circle from "/assets/icons/circle.svg";

function SectionTitle({ title }) {
  return (
    <div className="section-title__container">
      <img
        className="section-title__cherry-icon"
        src={Cherry}
        alt="Cherry icon"
      />

      <p className="section-title__click-text">
        Clickeá para agregar al carrito!
      </p>

      <div className="section-title__title">
        <img className="circle-icon" src={Circle} alt="Circle icon" />
        <h1>{title}</h1>
        <img className="circle-icon" src={Circle} alt="Circle icon" />
      </div>
    </div>
  );
}

export default SectionTitle;
