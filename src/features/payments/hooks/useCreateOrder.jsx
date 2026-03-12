import { useState } from "react";
import apiClient from "../../auth/api/apiClient";

function useCreateOrder() {
  const [createOrderError, setCreateOrderError] = useState(null);

  const handleCreateOrder = async (cartId, total) => {
    try {
      await apiClient.post(`/client-order/create/${cartId}`, { total });
    } catch (error) {
      setCreateOrderError(error);
    }
  };

  return { handleCreateOrder, createOrderError };
}

export default useCreateOrder;
