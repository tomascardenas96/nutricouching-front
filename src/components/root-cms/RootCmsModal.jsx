import { useEffect, useState } from "react";
import { CiBoxList } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import "./RootCmsModal.css";
import ProductsCmsList from "./products/ProductsCmsList";
import ProfessionalsList from "./professionals/ProfessionalsList";
import ServicesList from "./services/ServicesList";
import ViandsList from "./viands/ViandsList";

function RootCmsModal({ handleCmsModal }) {
  const [selectedOption, setSelectedOption] = useState("services");
  const [isRootModalAnimating, setIsRootModalAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const closeModal = () => {
    setIsRootModalAnimating(true);
  };

  useEffect(() => {
    if (isRootModalAnimating) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
        handleCmsModal();
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isRootModalAnimating, handleCmsModal]);

  if (!isVisible) return null;

  return (
    <section className="cms-modal_container" onClick={closeModal}>
      <aside
        onClick={(e) => e.stopPropagation()}
        className={`root-cms-modal_container ${
          isRootModalAnimating ? "fade-out" : "fade-in"
        }`}
      >
        <IoMdClose className="close-cms-icon" onClick={closeModal} />
        <h1 className="root-panel_info">
          Panel de administracion <CiBoxList className="panel-icon" />
        </h1>
        <div>
          <div className="root-cms_list">
            <ul>
              <li
                onClick={() => setSelectedOption("products")}
                className={
                  selectedOption === "products" ? "selected-option" : null
                }
              >
                Productos
              </li>
              <li
                onClick={() => setSelectedOption("services")}
                className={
                  selectedOption === "services" ? "selected-option" : null
                }
              >
                Servicios
              </li>
              <li
                onClick={() => setSelectedOption("professionals")}
                className={
                  selectedOption === "professionals" ? "selected-option" : null
                }
              >
                Profesionales
              </li>
              <li
                onClick={() => setSelectedOption("viands")}
                className={
                  selectedOption === "viands" ? "selected-option" : null
                }
              >
                Viandas
              </li>
            </ul>

            {/* Dependiendo de la opcion seleccionada, sera el modal que se abrirá  */}
            {selectedOption === "products" ? (
              <ProductsCmsList />
            ) : selectedOption === "services" ? (
              <ServicesList />
            ) : selectedOption === "professionals" ? (
              <ProfessionalsList />
            ) : selectedOption === "viands" ? (
              <ViandsList />
            ) : null}
          </div>
        </div>
      </aside>
    </section>
  );
}

export default RootCmsModal;
