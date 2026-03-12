import { useEffect, useState } from "react";
import apiClient from "../../auth/api/apiClient";

function useGetConfirmedOrders() {
  const [orders, setOrders] = useState({});
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await apiClient.get("/invoice");
        setOrders(data);
      } catch (err) {
        setOrdersError("Error al obtener los pedidos");
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, ordersLoading, ordersError, setOrders };
}

export default useGetConfirmedOrders;
