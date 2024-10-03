import { IoIosTime } from "react-icons/io";
import { useUser } from "../../context/UserProvider";
import useBookAppointment from "../../hooks/useBookAppointment";
import useGetProfessionalSchedule from "../../hooks/useGetProfessionalSchedule";
import useGetProfessionalsByService from "../../hooks/useGetProfessionalsByService";
import "./ReservationModal.css";

function ReservationModal({
  handleOpenRequestReservation,
  selectedService,
  setIsRequestReservationOpen,
}) {
  const { user } = useUser();

  const {
    professionalSchedule,
    setSelectedProfessional,
    setSelectedDate,
    selectedProfessional,
    selectedDate,
    setSelectedTime,
    selectedTime,
  } = useGetProfessionalSchedule();

  const { handleSubmitBookAppointment } = useBookAppointment(
    setIsRequestReservationOpen
  );

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
          <form
            onSubmit={(e) =>
              handleSubmitBookAppointment(
                e,
                selectedDate,
                selectedTime,
                selectedService.serviceId,
                user.userId,
                selectedProfessional
              )
            }
          >
            <label htmlFor="professional">
              Seleccione un profesional:
              <select
                id="professional"
                onChange={(e) => setSelectedProfessional(e.target.value)}
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
              />
            </label>
            <label htmlFor="time">
              Hora
              <select
                id="time"
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">Seleccione un horario</option>
                {professionalSchedule?.map((time) => (
                  <option key={time.availabilityId} value={time.startTime}>
                    {time.startTime}
                  </option>
                ))}
              </select>
            </label>
            <div className="reservation_btn">
              <button type="submit">
                Reservar turno <IoIosTime />{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ReservationModal;
