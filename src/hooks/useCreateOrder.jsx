import React, { useState } from "react";
import { HOST } from "../api/data";

function useCreateOrder() {
  const authToken = localStorage.getItem("authToken");

  const [createOrderError, setCreateOrderError] = useState(null);

  const handleCreateOrder = async (cartId, total) => {
    try {
      const response = await fetch(`${HOST}/client-order/create/${cartId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ total }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error();
      }
    } catch (error) {
      setCreateOrderError(error);
    }
  };

  return { handleCreateOrder, createOrderError };
}

export default useCreateOrder;
