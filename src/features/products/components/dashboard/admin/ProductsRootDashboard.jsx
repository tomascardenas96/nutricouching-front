import { useState } from "react";
import { createPortal } from "react-dom";
import ModifyProductModal from "./modals/ModifyProductModal";
import useGetAllProducts from "../../../hooks/useGetAllProducts";
import ProductsListDashboard from "./ProductsListDashboard";
import "./ProductsRootDashboard.css";

function ProductsRootDashboard() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {
    products,
    handleModifyProductModal,
    isModifyProductModalOpen,
    setProducts,
  } = useGetAllProducts(null, setSelectedProduct);

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
          <ProductsListDashboard
            products={products}
            setProducts={setProducts}
            handleModifyProductModal={handleModifyProductModal}
          />
        </tbody>
      </table>

      {isModifyProductModalOpen &&
        createPortal(
          <ModifyProductModal
            selectedProduct={selectedProduct}
            setProducts={setProducts}
            handleModifyProductModal={handleModifyProductModal}
          />,
          document.body
        )}
    </>
  );
}

export default ProductsRootDashboard;
