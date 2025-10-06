import { BsCart4 } from "react-icons/bs";
import { MdOutlineFileDownload } from "react-icons/md";
import { toast } from "sonner";
import { HOST } from "../../../api/data";
import CardPrice from "./CardPrice";
import "./PlanCard.css";

function PlanCard({
  title,
  type,
  image,
  price,
  isOffer,
  id,
  handleOpenMoreInfoModal,
  setSelectedPlan,
  plan,
  status,
  handleDownloadPlan,
  downloadLoading,
  handlePurchasePlan,
  paymentLoading,
  user,
  handleLoginModal,
  setSelectedService,
  handleOpenSmartPlanModal,
  loadingPlanId,
}) {
  const openModal = () => {
    setSelectedPlan({ ...plan, status });
    handleOpenMoreInfoModal();
  };

  // Verify if there is a user, if not, open login modal and toast error
  const verifyUserAndPurchasePlan = () => {
    if (user) {
      handlePurchasePlan(id);
    } else {
      handleLoginModal();
      setSelectedService(null);
      handleOpenSmartPlanModal();
      toast.error("Inicia sesión para comprar un plan");
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
            loadingPlanId !== id ? (
              <button className="buy-btn" onClick={verifyUserAndPurchasePlan}>
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
              onClick={() => handleDownloadPlan(id)}
              disabled={paymentLoading}
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

export default PlanCard;
