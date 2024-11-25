import "./ProductCmsCard.css";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { HOST } from "../../../api/data";
import { useState } from "react";

function ProductCmsCard({
  product,
  handleModifyProductModal,
  setSelectedProduct,
  deleteProduct,
  openModal,
}) {
  const handleModifyProductModalWithData = () => {
    handleModifyProductModal();
    setSelectedProduct(product);
  };

  const handleDeleteProductById = () => {
    openModal(product.productId);
  };

  return (
    <>
      <td className="cms-product_name">
        <div className="product-img">
          <img
            src={`${HOST}/uploads/products/${product.image}`}
            alt="product-image"
          />
        </div>
        <h1 className="product-title">{product.name.toLowerCase()}</h1>
        <p className="product-other">
          Unidades en stock: <span>{product.stock}</span>
        </p>
      </td>
      <td className="cms-product_price">
        <p>${product.price}</p>
      </td>
      <td className="cms-product_options">
        <p>
          <FaRegEdit
            onClick={handleModifyProductModalWithData}
            className="cms-product_options-icon"
          />
          <FaRegTrashAlt
            className="cms-product_options-icon"
            onClick={handleDeleteProductById}
          />
        </p>
      </td>
    </>
  );
}

export default ProductCmsCard;
