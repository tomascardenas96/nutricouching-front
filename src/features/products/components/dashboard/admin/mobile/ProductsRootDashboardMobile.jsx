import { useState } from "react";
import useGetAllProducts from "../../../../hooks/useGetAllProducts";
import useHandleProductsModals from "../../../../hooks/useHandleProductsModals";
import AddProductModal from "../modals/AddProductModal";
import ModifyProductModal from "../modals/ModifyProductModal";
import "./ProductsRootDashboardMobile.css";
import ProductsCardDashboardMobile from "./ProductsCardDashboardMobile";
import { createPortal } from "react-dom";
import DashboardListSkeleton from "../../../../../../common/components/dashboard/loader/DashboardListSkeleton";

function ProductsRootDashboardMobile() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products, setProducts, productsError, productsLoading } =
    useGetAllProducts(null, setSelectedProduct);

  const {
    handleAddProductModal,
    handleModifyProductModalOpen,
    handleModifyProductModalClose,
    isAddProductModalOpen,
    isModifyProductModalOpen,
  } = useHandleProductsModals(setSelectedProduct);

  return (
    <>
      <div className="products-root-dashboard_mobile-container">
        <div className="products-root-dashboard-mobile">
          {productsError ? (
            <p className="error">Ha ocurrido un error</p>
          ) : productsLoading ? (
            <DashboardListSkeleton />
          ) : products?.length > 0 ? (
            <>
              <div className="split-products-card">
                {products.map((product) => (
                  <ProductsCardDashboardMobile
                    key={`product-${product.productId}`}
                    product={product}
                    setProducts={setProducts}
                    handleModifyProductModalOpen={handleModifyProductModalOpen}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="no-products">No hay productos aún</p>
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
          document.body
        )}

      {isAddProductModalOpen &&
        createPortal(
          <AddProductModal
            handleAddProductModal={handleAddProductModal}
            setProducts={setProducts}
          />,
          document.body
        )}
    </>
  );
}

export default ProductsRootDashboardMobile;
