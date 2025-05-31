import ProductsCardDashboard from "./ProductsCardDashboard";
import "./ProductsListDashboard.css";

function ProductsListDashboard({ products, handleModifyProductModal }) {
  return products.map((product) => (
    <ProductsCardDashboard
      product={product}
      handleModifyProductModal={handleModifyProductModal}
    />
  ));
}

export default ProductsListDashboard;
