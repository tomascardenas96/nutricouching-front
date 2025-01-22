import "./AdminCmsModal.css";
import { MdSupervisedUserCircle } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import Bookings from "./Bookings/Bookings";
import Schedules from "./Schedules/Schedules";
import { useState } from "react";

function AdminCmsModal({ handleAdminCmsModal }) {
  const [selectedOption, setSelectedOption] = useState("bookings");

  return (
    <section
      className="admin-cms-modal_container"
      onClick={handleAdminCmsModal}
    >
      <aside className="admin-cms-modal" onClick={(e) => e.stopPropagation()}>
        <div className="title-professional-modal">
          <div className="title-icon">
            <h1>Panel de Profesional</h1>
            <MdSupervisedUserCircle className="user-circle" />
          </div>
          <div>
            <IoMdClose className="close-icon" onClick={handleAdminCmsModal} />
          </div>
        </div>

        <div className="body-professional-modal">
          <div className="table-header">
            <p
              onClick={() => setSelectedOption("bookings")}
              className={selectedOption === "bookings" ? "selectedOption" : ""}
            >
              Turnos
            </p>
            <p
              onClick={() => setSelectedOption("schedules")}
              className={selectedOption === "schedules" ? "selectedOption" : ""}
            >
              Horarios de Atencion
            </p>
          </div>

          <div className="table-body">
            {selectedOption === "bookings" ? <Bookings /> : <Schedules />}
          </div>
        </div>
      </aside>
    </section>
  );
}

export default AdminCmsModal;
