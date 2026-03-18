import { useState } from "react";
import { createPortal } from "react-dom";
import DashboardListSkeleton from "../../../../../common/components/dashboard/loader/DashboardListSkeleton";
import { useSelectMenuOption } from "../../../../dashboard/hooks/useSelectMenuOption";
import useGetAllProducts from "../../../hooks/useGetAllProducts";
import useHandleProductsModals from "../../../hooks/useHandleProductsModals";
import AddProductModal from "./modals/AddProductModal";
import ModifyProductModal from "./modals/ModifyProductModal";
import ProductsListDashboard from "./ProductsListDashboard";
import "./ProductsRootDashboard.css";

function ProductsRootDashboard() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products, setProducts, productsLoading, productsError } = useGetAllProducts();
  const { searchTerm } = useSelectMenuOption();

  const {
    handleAddProductModal,
    handleModifyProductModalOpen,
    handleModifyProductModalClose,
    isAddProductModalOpen,
    isModifyProductModalOpen,
  } = useHandleProductsModals(setSelectedProduct);

  const filtered = searchTerm
    ? products.filter((p) => p.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    : products;

  return (
    <>
      <div className="products-dashboard-container">
        {productsError ? (
          <p className="error">Ha ocurrido un error</p>
        ) : productsLoading ? (
          <DashboardListSkeleton />
        ) : filtered.length > 0 ? (
          <table className="products-root-dashboard_table">
            <thead>
              <tr>
                <th className="image-column"></th>
                <th>Descripción</th>
                <th className="stock-column">Stock</th>
                <th className="price-column">Precio</th>
                <th className="options-column">Opciones</th>
              </tr>
            </thead>
            <tbody>
              <ProductsListDashboard
                products={filtered}
                setProducts={setProducts}
                handleModifyProductModalOpen={handleModifyProductModalOpen}
              />
            </tbody>
          </table>
        ) : (
          <p className="no-products">
            {searchTerm ? "Sin resultados para la búsqueda" : "No hay productos aún"}
          </p>
        )}

        {!productsError && !productsLoading && (
          <div className="add-product_btn" onClick={handleAddProductModal}>
            <button>Agregar producto</button>
          </div>
        )}
      </div>

      {isModifyProductModalOpen &&
        createPortal(
          <ModifyProductModal
            selectedProduct={selectedProduct}
            setProducts={setProducts}
            handleModifyProductModalClose={handleModifyProductModalClose}
          />,
          document.getElementById("root-portal")
        )}

      {isAddProductModalOpen &&
        createPortal(
          <AddProductModal
            handleAddProductModal={handleAddProductModal}
            setProducts={setProducts}
          />,
          document.getElementById("root-portal")
        )}
    </>
  );
}

export default ProductsRootDashboard;
