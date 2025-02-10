import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdSupervisedUserCircle } from "react-icons/md";
import "./AdminCmsModal.css";
import Bookings from "./Bookings/Bookings";
import Schedules from "./Schedules/Schedules";
import Specialties from "./Specialties/Specialties";
import { useUser } from "../../context/UserProvider";

function AdminCmsModal({ handleAdminCmsModal }) {
  const [selectedOption, setSelectedOption] = useState("bookings");

  const { user } = useUser();

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
            {selectedOption === "bookings" && <Bookings user={user} />}
            {selectedOption === "schedules" && <Schedules user={user} />}
            {selectedOption === "specialties" && <Specialties user={user} />}
          </div>
        </div>
      </aside>
    </section>
  );
}

export default AdminCmsModal;
