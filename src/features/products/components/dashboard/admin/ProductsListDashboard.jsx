import ProductsCardDashboard from "./ProductsCardDashboard";
import "./ProductsListDashboard.css";

function ProductsListDashboard({
  products,
  setProducts,
  handleModifyProductModalOpen,
}) {
  return products.map((product) => (
    <ProductsCardDashboard
      product={product}
      handleModifyProductModalOpen={handleModifyProductModalOpen}
      setProducts={setProducts}
    />
  ));
}

export default ProductsListDashboard;
