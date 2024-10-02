import { IoIosTime } from "react-icons/io";
import useGetProfessionalSchedule from "../../hooks/useGetProfessionalSchedule";
import useGetProfessionalsByService from "../../hooks/useGetProfessionalsByService";
import "./ReservationModal.css";

function ReservationModal({ handleOpenRequestReservation, selectedService }) {
  const {
    professionalSchedule,
    setSelectedProfessional,
    setSelectedDate,
    selectedProfessional,
    selectedDate,
  } = useGetProfessionalSchedule();

  const { professionalsByService } = useGetProfessionalsByService(
    selectedService?.serviceId
  );

  return (
    <section
      className="request-reservation_modal"
      onClick={handleOpenRequestReservation}
    >
      <div className="request-reservation" onClick={(e) => e.stopPropagation()}>
        <div className="reservation_title">
          <h1>SOLICITAR TURNO: </h1>
          <h2>{selectedService?.title}</h2>
        </div>

        <div className="reservation_body">
          <form>
            <label htmlFor="professional">
              Seleccione un profesional:
              <select
                id="professional"
                onChange={(e) => setSelectedProfessional(e.target.value)}
                value={selectedProfessional}
              >
                <option value="">Seleccione un profesional</option>
                {professionalsByService?.map((professional) => (
                  <option
                    key={professional.professionalId}
                    value={professional.professionalId}
                  >
                    {professional.fullname}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="date">
              Fecha
              <input
                type="date"
                id="date"
                onChange={(e) => setSelectedDate(e.target.value)}
                value={selectedDate}
              />
            </label>
            <label htmlFor="time">
              Hora
              <select id="time">
                <option value="">Seleccione un horario</option>
                {professionalSchedule?.map((time) => (
                  <option key={time.availabilityId} value={time.startTime}>
                    {time.startTime}
                  </option>
                ))}
              </select>
            </label>
          </form>
        </div>

        <div className="reservation_btn">
          <button>
            Reservar turno <IoIosTime />{" "}
          </button>
        </div>
      </div>
    </section>
  );
}

export default ReservationModal;
