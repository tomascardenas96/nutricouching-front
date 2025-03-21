import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { LiaAddressCard } from "react-icons/lia";
import useDeleteProduct from "../../../hooks/useDeleteProduct";
import useGetAllProducts from "../../../hooks/useGetAllProducts";
import ConfirmationModal from "../../Common/ConfirmationModal";
import ProductCmsCard from "./ProductCmsCard";
import "./ProductsCmsList.css";
import AddProductModal from "./modals/AddProductModal";
import ModifyProductModal from "./modals/ModifyProductModal";

function ProductsCmsList() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    currentProducts,
    isAddProductModalOpen,
    isModifyProductModalOpen,
    handleAddProductModal,
    handleModifyProductModal,
    products,
    setProducts,
  } = useGetAllProducts();

  const { deleteProduct, isModalOpen, openModal, closeModal } =
    useDeleteProduct(setProducts);

  return (
    <>
      <div className="cms-product-list">
        <div className="cms-product_filter">
          <form>
            <input type="text" placeholder="Buscar" />
            <CiSearch className="products_search-filter_icon" />
          </form>
        </div>

        <div className="cms-product_body">
          <table>
            <thead className="header_table">
              <tr>
                <th className="header_table-name">Nombre</th>
                <th className="header_table-price">Precio</th>
                <th className="header_table-options">Opciones</th>
              </tr>
            </thead>
            <tbody className="body_table">
              {products?.map((product) => (
                <tr key={`product-${product.productId}`}>
                  <ProductCmsCard
                    product={product}
                    handleModifyProductModal={handleModifyProductModal}
                    setSelectedProduct={setSelectedProduct}
                    deleteProduct={deleteProduct}
                    openModal={openModal}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div onClick={handleAddProductModal} className="cms-product-add">
          <LiaAddressCard className="add-product_icon" />
          <h1>CREAR NUEVO PRODUCTO</h1>
        </div>

        {/* Modal para crear un nuevo producto */}
        {isAddProductModalOpen && (
          <AddProductModal
            handleAddProductModal={handleAddProductModal}
            setProducts={setProducts}
          />
        )}

        {/* Modal para modificar un producto existente */}
        {isModifyProductModalOpen && (
          <ModifyProductModal
            handleModifyProductModal={handleModifyProductModal}
            selectedProduct={selectedProduct}
            setProducts={setProducts}
          />
        )}

        {/* Modal para eliminar un producto existente */}
        {isModalOpen && (
          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onConfirm={deleteProduct}
            message="¿Seguro que desea eliminar el producto?"
          />
        )}
      </div>
    </>
  );
}

export default ProductsCmsList;
