import { useState } from "react";
import { createPortal } from "react-dom";
import DashboardListSkeleton from "../../../../../../common/components/dashboard/loader/DashboardListSkeleton";
import { useSelectMenuOption } from "../../../../../dashboard/hooks/useSelectMenuOption";
import useGetAllProducts from "../../../../hooks/useGetAllProducts";
import useHandleProductsModals from "../../../../hooks/useHandleProductsModals";
import AddProductModal from "../modals/AddProductModal";
import ModifyProductModal from "../modals/ModifyProductModal";
import ProductsCardDashboardMobile from "./ProductsCardDashboardMobile";
import "./ProductsRootDashboardMobile.css";

function ProductsRootDashboardMobile() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products, setProducts, productsError, productsLoading } = useGetAllProducts();
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
      <div className="products-root-dashboard_mobile-container">
        <div className="products-root-dashboard-mobile">
          {productsError ? (
            <p className="error">Ha ocurrido un error</p>
          ) : productsLoading ? (
            <DashboardListSkeleton />
          ) : filtered.length > 0 ? (
            <div className="split-products-card">
              {filtered.map((product) => (
                <ProductsCardDashboardMobile
                  key={`product-${product.productId}`}
                  product={product}
                  setProducts={setProducts}
                  handleModifyProductModalOpen={handleModifyProductModalOpen}
                />
              ))}
            </div>
          ) : (
            <p className="no-products">
              {searchTerm ? "Sin resultados para la búsqueda" : "No hay productos aún"}
            </p>
          )}
        </div>

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

export default ProductsRootDashboardMobile;
