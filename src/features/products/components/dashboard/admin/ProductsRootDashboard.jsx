import { useState } from "react";
import { createPortal } from "react-dom";
import ModifyProductModal from "./modals/ModifyProductModal";
import useGetAllProducts from "../../../hooks/useGetAllProducts";
import ProductsListDashboard from "./ProductsListDashboard";
import "./ProductsRootDashboard.css";
import useHandleProductsModals from "../../../hooks/useHandleProductsModals";
import AddProductModal from "./modals/AddProductModal";

function ProductsRootDashboard() {
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
      <table className="products-root-dashboard_table">
        <thead>
          <tr>
            <th className="image-column"></th>
            <th>Descripcion</th>
            <th className="stock-column">Stock</th>
            <th className="price-column">Precio</th>
            <th className="options-column">Opciones</th>
          </tr>
        </thead>

        <tbody>
          {products?.length > 0 ? (
            <ProductsListDashboard
              products={products}
              setProducts={setProducts}
              handleModifyProductModalOpen={handleModifyProductModalOpen}
            />
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
        </tbody>
      </table>

      <div className="add-product_btn" onClick={handleAddProductModal}>
        <button>Agregar producto</button>
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

export default ProductsRootDashboard;
