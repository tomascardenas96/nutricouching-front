import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdSupervisedUserCircle } from "react-icons/md";
import "./AdminCmsModal.css";
import Bookings from "../../Bookings/components/Bookings";
import Schedules from "../../schedule/components/Schedules";
import Specialties from "../../specialties/components/Specialties";

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
            <p
              onClick={() => setSelectedOption("specialties")}
              className={
                selectedOption === "specialties" ? "selectedOption" : ""
              }
            >
              Especialidades
            </p>
          </div>

          <div className="table-body">
            {selectedOption === "bookings" && <Bookings />}
            {selectedOption === "schedules" && <Schedules />}
            {selectedOption === "specialties" && <Specialties />}
          </div>
        </div>
      </aside>
    </section>
  );
}

export default AdminCmsModal;
