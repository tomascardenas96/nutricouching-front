import ProductsCardDashboard from "./ProductsCardDashboard";
import "./ProductsListDashboard.css";

function ProductsListDashboard({
  products,
  setProducts,
  handleModifyProductModal,
}) {
  return products.map((product) => (
    <ProductsCardDashboard
      product={product}
      handleModifyProductModal={handleModifyProductModal}
      setProducts={setProducts}
    />
  ));
}

export default ProductsListDashboard;
