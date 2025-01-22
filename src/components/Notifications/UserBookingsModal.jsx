import "./UserBookingsModal.css";
import { IoMdClose } from "react-icons/io";
import { GrSchedule } from "react-icons/gr";
import { MdHistory } from "react-icons/md";
import BookingsCard from "../admin-cms/Bookings/BookingsCard/BookingsCard";
import BookingsHeader from "../admin-cms/Bookings/BookingsHeader/BookingsHeader";
import React from "react";
import PreviousShiftUserCard from "./PreviousShiftUserCard";

function UserBookingsModal({ closeModal }) {
  return (
    <div className="user-notifications-modal_container" onClick={closeModal}>
      <section
        className="user-notifications-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pending-shifts-header">
          <h1>
            Turnos Pendientes <GrSchedule className="schedule-icon" />
          </h1>
          <IoMdClose className="close-icon" onClick={closeModal} />
        </div>
        <div className="pending-shifts_container">
          {true ? (
            <>
              <BookingsHeader date="Lunes 23 de Enero" />
              <BookingsCard
                name="Natasha Dirialdi"
                specialty="Coach Ontologico"
                timetable="09:00hs - 09:30hs"
              />
              <BookingsCard
                name="Natasha Dirialdi"
                specialty="Coach Ontologico"
                timetable="09:00hs - 09:30hs"
              />

              <BookingsHeader date="Miercoles 25 de Enero" />

              <BookingsCard
                name="Natasha Dirialdi"
                specialty="Coach Ontologico"
                timetable="09:00hs - 09:30hs"
              />
            </>
          ) : (
            <p className="no-pending-bookings">No hay turnos pendientes.</p>
          )}
        </div>

        <div className="previous-shifts-header">
          <h1>
            Historial de Turnos <MdHistory className="history-icon" />
          </h1>
        </div>
        <div className="previous-shifts_container">
          {false ? (
            <>
              <PreviousShiftUserCard
                name="Micaela Aguilar"
                date="25/12/24"
                specialty="Coach Ontologico"
                timetable="14:00hs - 14:30hs"
              />
              <PreviousShiftUserCard
                name="Lorena Arlan"
                date="21/12/24"
                specialty="Coach Deportivo"
                timetable="17:00hs - 17:30hs"
              />
              <PreviousShiftUserCard
                name="Joaquin Cardenas"
                date="19/12/24"
                specialty="Coach Ejecutivo"
                timetable="10:00hs - 10:30hs"
              />
            </>
          ) : (
            <p className="no-previous-shifts">No hay turnos anteriores.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default UserBookingsModal;
