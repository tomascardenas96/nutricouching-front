import { MdArrowForwardIos } from "react-icons/md";
import "./TurnPageArrow.css";

function TurnPageArrow({ turnPage, direction, color }) {
  return (
    <div className="turn-page" style={{ color }} onClick={turnPage}>
      {direction === "left" ? (
        <MdArrowForwardIos style={{ transform: "rotate(180deg)" }} />
      ) : (
        <MdArrowForwardIos />
      )}
    </div>
  );
}

export default TurnPageArrow;
