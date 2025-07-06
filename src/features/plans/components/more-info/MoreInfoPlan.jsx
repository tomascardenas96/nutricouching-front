import { IoMdClose, IoMdTime } from "react-icons/io";
import { HOST } from "../../../../api/data";
import { MdOutlineFileDownload } from "react-icons/md";
import "./MoreInfoPlan.css";
import { useState } from "react";

function MoreInfoPlan({
  image,
  title,
  shortDescription,
  description,
  price,
  weight = "15 kb",
  date = "24 de Marzo de 2025",
  handleOpenMoreInfoModal,
  setSelectedPlan,
  status,
  handleDownloadPlan,
  downloadLoading,
  handlePurchasePlan,
  paymentLoading,
  id,
}) {
  const [purchaseLoading, setPurchaseLoading] = useState(false);

  const closeModal = () => {
    setSelectedPlan(null);
    handleOpenMoreInfoModal();
  };

  return (
    <div className="more-info-plan_background">
      <div className="more-info-plan_modal">
        <div className="plan-purchase_header">
          <div className="plan-image">
            <img
              src={`${HOST}/uploads/plans/images/${image}`}
              alt={`Imagen representativa del plan ${title}, ${shortDescription}`}
            />
          </div>

          <div className="plan-info">
            <h1>
              <div>{title}</div>
              <div className="close-icon" onClick={closeModal}>
                <IoMdClose />
              </div>
            </h1>

            <p>{shortDescription}</p>

            <div className="button-container">
              {status === "adquired" && (
                <button
                  className="download-plan"
                  onClick={() => handleDownloadPlan(id)}
                >
                  Descargar <MdOutlineFileDownload className="download-icon" />
                </button>
              )}

              {status === "not-purchased" &&
                (paymentLoading ? (
                  <button
                    className="purchase-plan_disabled"
                    disabled
                  >{`Comprar $${price}`}</button>
                ) : (
                  <button
                    className="purchase-plan"
                    onClick={() => handlePurchasePlan(id)}
                  >{`Comprar $${price}`}</button>
                ))}

              <div className="button-container_file-info">
                <p>{weight}</p>
                <p>
                  <IoMdTime className="time-icon" /> {date}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="plan-description">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default MoreInfoPlan;
