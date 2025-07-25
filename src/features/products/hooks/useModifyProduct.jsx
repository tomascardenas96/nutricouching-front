import { useState } from "react";
import { toast } from "sonner";
import { HOST } from "../../../api/data";

function useModifyProduct(
  selectedProduct,
  setProducts,
  handleModifyProductModalClose
) {
  const authToken = localStorage.getItem("authToken");

  const [modifyProductInput, setModifyProductInput] = useState(selectedProduct);
  const [fileModifyProduct, setFileModifyProduct] = useState(null);
  const [imagePreviewModifyProduct, setImagePreviewModifyProduct] =
    useState(null);

  const handleSubmitModifyProduct = (e) => {
    e.preventDefault();

    const modifyProduct = async () => {
      const formData = new FormData();

      formData.append("name", modifyProductInput.name);
      formData.append("description", modifyProductInput.description);
      formData.append("stock", modifyProductInput.stock);
      formData.append("price", modifyProductInput.price);

      if (fileModifyProduct) {
        formData.append("file", fileModifyProduct);
      }

      const response = await fetch(
        `${HOST}/product/update/${selectedProduct.productId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      return await response.json();
    };

    toast.promise(modifyProduct(), {
      success: (data) => {
        setProducts((prev) =>
          prev.map((product) =>
            product.productId === selectedProduct.productId
              ? {
                  ...product,
                  ...modifyProductInput,
                  image: fileModifyProduct ? data.image : selectedProduct.image,
                }
              : product
          )
        );
        handleModifyProductModalClose();
        return "Producto modificado exitosamente";
      },
      loading: "Cargando...",
      error: (error) => {
        return "Error modificando el producto";
      },
    });
  };

  const handleChangeModifyProduct = (e) => {
    const { name, value } = e.target;
    setModifyProductInput({ ...modifyProductInput, [name]: value });
  };

  const handleChangeSelectedFile = (e) => {
    const selectedModifyProductFile = e.target.files[0];
    setFileModifyProduct(selectedModifyProductFile);

    if (selectedModifyProductFile) {
      const fileURL = URL.createObjectURL(selectedModifyProductFile);
      setImagePreviewModifyProduct(fileURL);
    }
  };

  return {
    handleSubmitModifyProduct,
    handleChangeModifyProduct,
    modifyProductInput,
    imagePreviewModifyProduct,
    handleChangeSelectedFile,
    fileModifyProduct,
  };
}

export default useModifyProduct;
