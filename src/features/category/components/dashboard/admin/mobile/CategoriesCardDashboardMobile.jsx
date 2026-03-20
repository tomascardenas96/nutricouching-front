import { memo } from "react";
import { FaEdit } from "react-icons/fa";
import "./CategoriesCardDashboardMobile.css";

const CategoriesCardDashboardMobile = memo(function CategoriesCardDashboardMobile({
  category,
  handleOpenModifyModal,
}) {
  return (
    <div className="category-card-dashboard-container">
      <div className="info-container">
        <p className="name">{category?.name}</p>
        <div className="buttons-container">
          <button className="edit-btn" onClick={() => handleOpenModifyModal(category)}>
            <FaEdit /> Editar
          </button>
        </div>
      </div>
    </div>
  );
});

export default CategoriesCardDashboardMobile;
