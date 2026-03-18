import { Link } from "react-router-dom";
import "./SeeMoreBtn.css";

function SeeMoreBtn({ text, to = "/products" }) {
  return (
    <div className="see-more-btn__container">
      <div>
        <hr />
        <Link to={to} className="see-more-btn__text">{text.toUpperCase()}</Link>
        <hr />
      </div>
    </div>
  );
}

export default SeeMoreBtn;
