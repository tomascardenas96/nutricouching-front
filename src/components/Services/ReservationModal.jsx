import { IoIosTime } from "react-icons/io";
import { useUser } from "../../context/UserProvider";
import useBookAppointment from "../../hooks/useBookAppointment";
import useGetAllSpecialtiesByService from "../../hooks/useGetAllSpecialtiesByService";
import useGetProfessionalSchedule from "../../hooks/useGetProfessionalSchedule";
import useGetProfessionalsByService from "../../hooks/useGetProfessionalsByService";
import useGetProfessionalsBySpecialty from "../../hooks/useGetProfessionalsBySpecialty";
import "./ReservationModal.css";

function ReservationModal({
  handleOpenRequestReservation,
  selectedService,
  setIsRequestReservationOpen,
}) {
  const { user } = useUser();
  const {
    specialties,
    specialtiesError,
    specialtiesLoading,
    selectedSpecialty,
    setSelectedSpecialty,
  } = useGetAllSpecialtiesByService(selectedService);

  const {
    professionalsBySpecialty,
    professionalsBySpecialtyError,
    professionalsBySpecialtyLoading,
    setSelectedProfessional,
    selectedProfessional,
  } = useGetProfessionalsBySpecialty(selectedSpecialty);

  const {
    professionalSchedule,
    setSelectedDate,
    selectedDate,
    setSelectedTime,
    selectedTime,
    endTime,
    setEndTime,
  } = useGetProfessionalSchedule(selectedProfessional);

  const { handleSubmitBookAppointment } = useBookAppointment(
    setIsRequestReservationOpen,
    selectedDate,
    selectedTime,
    selectedService.serviceId,
    user?.userId,
    selectedProfessional,
    selectedSpecialty,
    professionalSchedule,
    setEndTime
  );

  const { professionalsByService } = useGetProfessionalsByService(
    selectedService?.serviceId
  );

  // Le damos un maximo y un minimo de dias para mostrar en el calendario (Hasta 1 mes)
  const today = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(today.getMonth() + 2);

  const formDate = (date) => date.toISOString().split("T")[0];

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
          <form onSubmit={handleSubmitBookAppointment}>
            <label htmlFor="specialty">
              Indique una especialidad
              <select onChange={(e) => setSelectedSpecialty(e.target.value)}>
                <option value="">Indique una especialidad</option>
                {specialties?.map((specialty) => (
                  <option
                    key={`specialty-${specialty.specialtyId}`}
                    value={specialty.specialtyId}
                  >
                    {specialty.name}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="professional">
              Seleccione un profesional
              <select
                id="professional"
                onChange={(e) => setSelectedProfessional(e.target.value)}
              >
                <option value="">Seleccione un profesional</option>
                {professionalsBySpecialty?.map((professional) => (
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
                min={formDate(today)}
                max={formDate(nextMonth)}
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
