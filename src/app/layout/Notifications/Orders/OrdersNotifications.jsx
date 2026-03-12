import React from "react";
import useGetConfirmedOrders from "../../../../features/orders/hooks/useGetConfirmedOrders";
import "./OrdersNotifications.css";
import useMarkOrderAsDelivered from "../../../../features/orders/hooks/useMarkOrderAsDelivered";

function OrdersNotifications() {
  const { orders, ordersLoading, ordersError, setOrders } =
    useGetConfirmedOrders();
  const { markLoading, handleMarkAsDelivered } =
    useMarkOrderAsDelivered(setOrders);

  if (ordersLoading)
    return <p className="orders-loading">Cargando pedidos...</p>;
  if (ordersError) return <p className="orders-error">{ordersError}</p>;

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Ordenamos los pedidos (más nuevos primero)
  const orderEntries = Object.entries(orders).sort(
    (a, b) => new Date(b[1].createdAt) - new Date(a[1].createdAt)
  );

  if (!orderEntries.length)
    return <p className="no-orders">No hay pedidos recientes.</p>;

  return (
    <section className="orders-section">
      <h3 className="orders-section__title">Pedidos recientes</h3>

      {orderEntries.map(
        ([orderId, order]) =>
          order.status === "confirmed" && (
            <div key={orderId} className="order-card">
              <header className="order-header">
                <div>
                  <h4 className="order-user">{order.user.name}</h4>
                  <p className="order-email">{order.user.email}</p>
                </div>
                <span className="order-date">
                  {formatDate(order.createdAt)}
                </span>
              </header>

              <div className="order-items">
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item">
                    <span className="order-item-name">{item.name}</span>
                    <span className="order-item-quantity">
                      {item.quantity}x ${item.price}
                    </span>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <p className="order-total">
                  Total: <span>${order.total}</span>
                </p>
                <button
                  className={`mark-delivered-btn ${
                    order.status === "delivered" ? "already-delivered" : ""
                  }`}
                  onClick={() => handleMarkAsDelivered(orderId)}
                  disabled={order.status === "delivered"}
                >
                  Marcar como entregado
                </button>
              </div>
            </div>
          )
      )}
    </section>
  );
}

export default OrdersNotifications;
