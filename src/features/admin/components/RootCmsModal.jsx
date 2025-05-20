import { useEffect, useState } from "react";
import { CiBoxList } from "react-icons/ci";
import { IoMdClose, IoMdMore } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import "./RootCmsModal.css";
import ProductsCmsList from "../../products/components/dashboard/ProductsCmsList";
import ProfessionalsList from "../../professional/components/dashboard/ProfessionalsList";
import SpecialtiesList from "../../specialties/components/dashboard/SpecialtiesList";
import ViandsList from "../../viands/components/ViandsList";

function RootCmsModal({ handleCmsModal }) {
  const [selectedOption, setSelectedOption] = useState("products");
  const [isRootModalAnimating, setIsRootModalAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);

  // Medida minima para cerrar el modal de opciones
  const closeMoreOptionsModalWhenResize = useMediaQuery({
    query: "(min-width: 440px)",
  });

  const closeModal = () => {
    setIsRootModalAnimating(true);
  };

  // Modal para ver secciones que no se muestran en la lista principal (responsive design)
  const handleMoreModal = () => {
    setIsMoreModalOpen(!isMoreModalOpen);
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

  // Cuando se redimensiona la pantalla, se cierra el modal de opciones
  useEffect(() => {
    if (closeMoreOptionsModalWhenResize) {
      setIsMoreModalOpen(false);
    }
  }, [closeMoreOptionsModalWhenResize]);

  if (!isVisible) return null;

  return (
    <section className="cms-modal_container" onClick={closeModal}>
      <aside
        onClick={(e) => e.stopPropagation()}
        className={`root-cms-modal_container ${
          isRootModalAnimating ? "fade-out" : "fade-in"
        }`}
      >
        <div className="cms-modal-root_title">
          <h1 className="root-panel_info">
            Panel de administracion <CiBoxList className="panel-icon" />
          </h1>

          <IoMdClose className="close-cms-icon" onClick={closeModal} />
        </div>

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
                onClick={() => setSelectedOption("viands")}
                className={
                  selectedOption === "viands" ? "selected-option" : null
                }
              >
                Viandas
              </li>
              <li
                onClick={() => setSelectedOption("specialties")}
                className={
                  selectedOption === "specialties" ? "selected-option" : null
                }
              >
                Especialidades
              </li>
              <li
                onClick={() => setSelectedOption("professionals")}
                className={
                  selectedOption === "professionals"
                    ? "selected-option root_professionals-section"
                    : "root_professionals-section"
                }
              >
                Profesionales
              </li>
              {/* Solo se muestra en responsive */}
              <li className="root-modal_see-more" onClick={handleMoreModal}>
                <IoMdMore className="more-icon" />
              </li>
              {isMoreModalOpen && (
                <div
                  className="root_more-options_modal"
                  onClick={handleMoreModal}
                >
                  <div onClick={(e) => e.stopPropagation()}>
                    <p onClick={() => setSelectedOption("professionals")}>
                      Profesionales
                    </p>
                  </div>
                </div>
              )}
            </ul>

            {/* Dependiendo de la opcion seleccionada, sera el modal que se abrirá  */}
            {selectedOption === "products" ? (
              <ProductsCmsList />
            ) : selectedOption === "specialties" ? (
              <SpecialtiesList />
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
