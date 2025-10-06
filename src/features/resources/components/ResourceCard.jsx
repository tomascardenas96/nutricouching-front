import { BsCart4 } from "react-icons/bs";
import { MdOutlineFileDownload } from "react-icons/md";
import { toast } from "sonner";
import CardPrice from "./CardPrice";
import "./ResourceCard.css";

function ResourceCard({
  title,
  type,
  image,
  price,
  isOffer,
  id,
  handleOpenMoreInfoModal,
  setSelectedResource,
  resource,
  status,
  handleDownloadResource,
  downloadLoading,
  handlePurchaseResource,
  loadingResourceId,
  user,
  handleLoginModal,
  setSelectedService,
  handleOpenSmartPlanModal,
  paymentLoading,
}) {
  const openModal = () => {
    setSelectedResource({ ...resource, status });
    handleOpenMoreInfoModal();
  };

  // Verify if there is a user, if not, open login modal and toast error
  const verifyUserAndPurchaseResource = () => {
    if (user) {
      handlePurchaseResource(id);
    } else {
      handleLoginModal();
      setSelectedService(null);
      handleOpenSmartPlanModal();
      toast.error("Inicia sesión para comprar un resource");
    }
  };

  return (
    <div className="plan-card">
      <CardPrice type={type} price={price} isOffer={isOffer} />

      <div className="card_image-container">
        <img src={image} alt="plan inteligente nutricoaching" />
      </div>

      <div className="card_name-options-container">
        <h3>{`> ${title}`}</h3>

        <form onSubmit={(e) => e.preventDefault()}>
          {type === "premium" || type === "off" ? (
            loadingResourceId !== id ? (
              <button
                className="buy-btn"
                onClick={verifyUserAndPurchaseResource}
                disabled={paymentLoading}
              >
                Comprar <BsCart4 className="cart-icon" />
              </button>
            ) : (
              <button className="buy-btn buy-btn-loading" disabled>
                Comprar <BsCart4 className="cart-icon" />
              </button>
            )
          ) : (
            <button
              className="download-btn"
              onClick={() => handleDownloadResource(id)}
            >
              Abrir <MdOutlineFileDownload className="download-icon" />
            </button>
          )}
          <button className="more-btn" onClick={openModal}>
            Mas Info
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResourceCard;
