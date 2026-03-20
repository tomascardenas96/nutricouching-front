import { IoIosTime } from "react-icons/io";
import BaseModal from "../../../../common/components/BaseModal";
import { useAuth } from "../../../auth/hooks/useAuth";
import useGetProfessionalSchedule from "../../../schedule/hooks/useGetProfessionalSchedule";
import useGetProfessionalsBySpecialty from "../../../professional/hooks/useGetProfessionalsBySpecialty";
import useGetAllSpecialtiesByService from "../../../specialties/hooks/useGetAllSpecialtiesByService";
import useBookAppointment from "../../hooks/useBookAppointment";
import "./ReservationModal.css";

function ReservationModal({
  handleOpenRequestReservation,
  selectedService,
  setIsRequestReservationOpen,
}) {
  const { user } = useAuth();
  const {
    specialties,
    selectedSpecialty,
    setSelectedSpecialty,
  } = useGetAllSpecialtiesByService(selectedService);

  const {
    professionalsBySpecialty,
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

  const today = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(today.getMonth() + 2);
  const formDate = (date) => date.toISOString().split("T")[0];

  return (
    <BaseModal
      isOpen={true}
      onClose={handleOpenRequestReservation}
      onSubmit={handleSubmitBookAppointment}
      title={`Solicitar turno: ${selectedService?.title}`}
      footer={
        <div className="bm-footer__actions">
          <button
            type="button"
            className="bm-btn bm-btn--secondary"
            onClick={handleOpenRequestReservation}
          >
            Cancelar
          </button>
          <button type="submit" className="bm-btn bm-btn--primary">
            Reservar turno <IoIosTime />
          </button>
        </div>
      }
    >
      <div className="reservation_body">
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
      </div>
    </BaseModal>
  );
}

export default ReservationModal;
