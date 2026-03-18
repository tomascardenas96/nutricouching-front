import ProductsCardDashboard from "./ProductsCardDashboard";

function ProductsListDashboard({ products, setProducts, handleModifyProductModalOpen }) {
  return products.map((product) => (
    <ProductsCardDashboard
      key={`product-${product.productId}`}
      product={product}
      setProducts={setProducts}
      handleModifyProductModalOpen={handleModifyProductModalOpen}
    />
  ));
}

export default ProductsListDashboard;
