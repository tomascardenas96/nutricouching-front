import "./Schedules.css";
import SchedulesCard from "./SchedulesCard/SchedulesCard";
import SchedulesHeader from "./SchedulesHeader/SchedulesHeader";

function Schedules() {
  return (
    <section className="professional-schedules_container">
      <SchedulesHeader date="Lunes" />
      <div className="bookings-list">
        <SchedulesCard from="09:00" to="09:30" interval="60" />
      </div>

      <SchedulesHeader date="Martes" />
      <div className="bookings-list">
        <SchedulesCard from="09:00" to="09:30" interval="60" />
      </div>

      <SchedulesHeader date="Miercoles" />
      <div className="bookings-list">
        <SchedulesCard from="09:00" to="13:00" interval="30" />
        <SchedulesCard from="17:00" to="21:00" interval="60" />
      </div>

      <SchedulesHeader date="Jueves" />
      <div className="bookings-list">
        <SchedulesCard from="09:00" to="13:00" interval="30" />
        <SchedulesCard from="17:00" to="21:00" interval="60" />
      </div>

      <SchedulesHeader date="Viernes" />
      <div className="bookings-list">
        <SchedulesCard from="09:00" to="13:00" interval="30" />
        <SchedulesCard from="17:00" to="21:00" interval="60" />
      </div>

      <SchedulesHeader date="Sabado" />
      <div className="bookings-list">
        <SchedulesCard from="09:00" to="17:00" interval="60" />
      </div>

      <div className="add-new-schedule">
        <h1>+ Agregar nuevo horario</h1>
      </div>
    </section>
  );
}

export default Schedules;
