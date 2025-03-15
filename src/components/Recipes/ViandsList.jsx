import { HOST } from "../../api/data";
import "./ViandsList.css";

function ViandsList({ viands, setLoaded, setSelectedIndex, selectedIndex }) {
  return (
    <div className="all-viands_list">
      {viands.map((viand, index) => (
        <div
          key={`viand-${viand.viandId}`}
          className={`all-viands_item ${
            selectedIndex === index ? "selected" : ""
          }`}
          onClick={() => {
            setLoaded(false);
            setSelectedIndex(index);
          }}
        >
          <img
            src={`${HOST}/uploads/viands/${viand.image}`}
            alt="viand-image_carousel"
          />
        </div>
      ))}
    </div>
  );
}

export default ViandsList;
