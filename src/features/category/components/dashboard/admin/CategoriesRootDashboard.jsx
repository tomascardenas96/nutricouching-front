import { useState } from "react";
import { createPortal } from "react-dom";
import DashboardListSkeleton from "../../../../../common/components/dashboard/loader/DashboardListSkeleton";
import { useSelectMenuOption } from "../../../../dashboard/hooks/useSelectMenuOption";
import useCategoryModals from "../../../hooks/useCategoryModals";
import useGetCategories from "../../../hooks/useGetCategories";
import CreateCategoryModal from "./modals/CreateCategoryModal";
import ModifyCategoryModal from "./modals/ModifyCategoryModal";
import "./CategoriesRootDashboard.css";

function CategoriesRootDashboard() {
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
      <div className="categories-dashboard-container">
        {categoriesError ? (
          <p className="error">Ha ocurrido un error</p>
        ) : areCategoriesLoading ? (
          <DashboardListSkeleton />
        ) : filtered.length ? (
          <table className="categories-root-dashboard_table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th className="options-column">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((category) => (
                <tr className="dashboard_category-item" key={`category-${category.categoryId}`}>
                  <td>{category.name}</td>
                  <td className="options-row">
                    <p className="edit" onClick={() => handleOpenModifyModal(category)}>
                      Editar
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-categories">
            {searchTerm ? "Sin resultados para la búsqueda" : "No hay categorías aún"}
          </p>
        )}

        {!categoriesError && !areCategoriesLoading && (
          <div className="add-category_btn" onClick={handleAddCategoryModal}>
            <button>Agregar categoría</button>
          </div>
        )}
      </div>

      {isAddCategoryModalOpen &&
        createPortal(
          <CreateCategoryModal
            closeModal={handleAddCategoryModal}
            setCategories={setCategories}
          />,
          document.getElementById("root-portal")
        )}

      {isModifyCategoryModalOpen &&
        createPortal(
          <ModifyCategoryModal
            selectedCategory={selectedCategory}
            setCategories={setCategories}
            closeModal={handleCloseModifyModal}
          />,
          document.getElementById("root-portal")
        )}

    </>
  );
}

export default CategoriesRootDashboard;
