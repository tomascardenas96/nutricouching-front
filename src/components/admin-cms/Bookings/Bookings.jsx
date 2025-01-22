import "./Bookings.css";
import BookingsCard from "./BookingsCard/BookingsCard";
import BookingsHeader from "./BookingsHeader/BookingsHeader";

function Bookings() {
  return (
    <section className="professional-bookings_container">
      <BookingsHeader date="Viernes 10 de Enero" />
      <div className="bookings-list">
        <BookingsCard
          name="Tomas Cardenas"
          specialty="Coaching Deportivo"
          timetable="21:00hs - 21:30hs"
        />
        <BookingsCard
          name="Micaela Aguilar"
          specialty="Coaching Ontologico"
          timetable="21:30hs - 22:00hs"
        />
        <BookingsCard
          name="Karina Arguello"
          specialty="Coaching Ontologico"
          timetable="22:00hs - 22:30hs"
        />
      </div>

      <BookingsHeader date="Sabado 11 de Enero" />

      <div className="bookings-list">
        <BookingsCard
          name="Tomas Cardenas"
          specialty="Coaching Deportivo"
          timetable="21:00hs - 21:30hs"
        />
      </div>

      <BookingsHeader date="Lunes 12 de Enero" />

      <div className="bookings-list">
        <BookingsCard
          name="Tomas Cardenas"
          specialty="Coaching Deportivo"
          timetable="21:00hs - 21:30hs"
        />
        <BookingsCard
          name="Micaela Aguilar"
          specialty="Coaching Ontologico"
          timetable="21:30hs - 22:00hs"
        />
        <BookingsCard
          name="Karina Arguello"
          specialty="Coaching Ontologico"
          timetable="22:00hs - 22:30hs"
        />
      </div>

      <BookingsHeader date="Miercoles 13 de Enero" />

      <div className="bookings-list">
        <BookingsCard
          name="Karina Arguello"
          specialty="Coaching Ontologico"
          timetable="22:00hs - 22:30hs"
        />
      </div>
    </section>
  );
}

export default Bookings;
