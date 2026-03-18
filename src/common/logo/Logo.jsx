import { Link } from "react-router-dom";
import "./Logo.css";

function Logo() {
  return (
    <div className="header-logo">
      <div>
        <Link to="/" className="logo-container">
          <div className="logo-name">
            <img src="/assets/cohesiva-logo.svg" alt="cohesiva-logo" />
            <p>Cohesiva</p>
          </div>
          <span>Equilibrio que transforma.</span>
        </Link>
      </div>
    </div>
  );
}

export default Logo;
