import "./CmsModal.css";
import { CiBoxList } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import ServicesList from "./services/ServicesList";

function CmsModal({ handleCmsModal }) {

  return (
    <aside onClick={(e) => e.stopPropagation()}>
      <IoMdClose className="close-cms-icon" onClick={handleCmsModal} />
      <h1>
        Panel de administracion <CiBoxList className="panel-icon" />
      </h1>
      <div>
        <ServicesList />
      </div>
    </aside>
  );
}

export default CmsModal;
