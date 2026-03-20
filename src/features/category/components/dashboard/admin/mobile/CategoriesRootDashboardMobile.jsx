import { useState } from "react";
import { createPortal } from "react-dom";
import DashboardListSkeleton from "../../../../../../common/components/dashboard/loader/DashboardListSkeleton";
import { useSelectMenuOption } from "../../../../../dashboard/hooks/useSelectMenuOption";
import useCategoryModals from "../../../../hooks/useCategoryModals";
import useGetCategories from "../../../../hooks/useGetCategories";
import ModifyCategoryModal from "../modals/ModifyCategoryModal";
import CreateCategoryModal from "../modals/CreateCategoryModal";
import CategoriesCardDashboardMobile from "./CategoriesCardDashboardMobile";
import "./CategoriesRootDashboardMobile.css";

function CategoriesRootDashboardMobile() {
  const { categories, setCategories, areCategoriesLoading, categoriesError } =
    useGetCategories();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { searchTerm } = useSelectMenuOption();

  const selectCategory = (category) => setSelectedCategory(category);

  const {
    isAddCategoryModalOpen,
    handleAddCategoryModal,
    isModifyCategoryModalOpen,
    handleOpenModifyModal,
    handleCloseModifyModal,
  } = useCategoryModals(selectCategory);

  const filtered = searchTerm
    ? categories.filter((c) => c.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    : categories;

  return (
    <>
      <div className="categories-root-dashboard_mobile-container">
        <div className="categories-root-dashboard-mobile">
          {categoriesError ? (
            <p className="error">Ha ocurrido un error</p>
          ) : areCategoriesLoading ? (
            <DashboardListSkeleton />
          ) : filtered.length > 0 ? (
            <div className="split-categories-card">
              {filtered.map((category) => (
                <CategoriesCardDashboardMobile
                  key={`category-${category.categoryId}`}
                  category={category}
                  handleOpenModifyModal={handleOpenModifyModal}
                />
              ))}
            </div>
          ) : (
            <p className="no-categories">
              {searchTerm ? "Sin resultados para la búsqueda" : "No hay categorías aún"}
            </p>
          )}
        </div>

        {!categoriesError && !areCategoriesLoading && (
          <div className="add-category_btn" onClick={handleAddCategoryModal}>
            <button>Agregar categoría</button>
          </div>
        )}
      </div>

      {isModifyCategoryModalOpen &&
        createPortal(
          <ModifyCategoryModal
            selectedCategory={selectedCategory}
            setCategories={setCategories}
            closeModal={handleCloseModifyModal}
          />,
          document.getElementById("root-portal")
        )}

      {isAddCategoryModalOpen &&
        createPortal(
          <CreateCategoryModal
            closeModal={handleAddCategoryModal}
            setCategories={setCategories}
          />,
          document.getElementById("root-portal")
        )}
    </>
  );
}

export default CategoriesRootDashboardMobile;
