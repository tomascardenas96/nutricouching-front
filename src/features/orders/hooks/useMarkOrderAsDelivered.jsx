import { useState } from "react";
import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";

function useMarkOrderAsDelivered(setOrders) {
  const [markLoading, setMarkLoading] = useState(false);

  const handleMarkAsDelivered = async (orderId) => {
    setMarkLoading(true);
    try {
      await apiClient.patch(`/client-order/${orderId}/delivered`);

      setOrders((prev) => {
        const filtered = Object.fromEntries(
          Object.entries(prev).filter(([key, value]) => key !== orderId)
        );

        return filtered;
      });
    } catch (error) {
      toast.error("Error al marcar la orden como entregada");
    } finally {
      setMarkLoading(false);
    }
  };

  return { markLoading, handleMarkAsDelivered };
}

export default useMarkOrderAsDelivered;
