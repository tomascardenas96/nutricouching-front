import { useState } from "react";
import useGetAllProducts from "../../../../hooks/useGetAllProducts";
import useHandleProductsModals from "../../../../hooks/useHandleProductsModals";
import AddProductModal from "../modals/AddProductModal";
import ModifyProductModal from "../modals/ModifyProductModal";
import "./ProductsRootDashboardMobile.css";
import ProductsCardDashboardMobile from "./ProductsCardDashboardMobile";
import { createPortal } from "react-dom";

function ProductsRootDashboardMobile() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products, setProducts } = useGetAllProducts(null, setSelectedProduct);

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
          {products?.length > 0 ? (
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
          ) : (
            <tr>
              <th
                colSpan={5}
                style={{ textAlign: "center" }}
                className="no-products"
              >
                No hay productos aún.
              </th>
            </tr>
          )}
        </div>

        <div className="add-product_btn" onClick={handleAddProductModal}>
          <button>Agregar producto</button>
        </div>
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
