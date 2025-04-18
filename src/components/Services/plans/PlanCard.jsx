import { BsCart4 } from "react-icons/bs";
import { MdOutlineFileDownload } from "react-icons/md";
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
}) {
  const openModal = () => {
    setSelectedPlan({ ...plan, status });
    handleOpenMoreInfoModal();
  };

  return (
    <div className="plan-card">
      <CardPrice type={type} price={price} isOffer={isOffer} />

      <div className="card_image-container">
        <img
          src={`${HOST}/uploads/plans/images/${image}`}
          alt="plan inteligente nutricoaching"
        />
      </div>

      <div className="card_name-options-container">
        <h3>{`> ${title}`}</h3>

        <form onSubmit={(e) => e.preventDefault()}>
          {type === "premium" || type === "off" ? (
            !paymentLoading ? (
              <button
                className="buy-btn"
                onClick={() => handlePurchasePlan(id)}
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
              onClick={() => handleDownloadPlan(id)}
            >
              Descargar <MdOutlineFileDownload className="download-icon" />
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
