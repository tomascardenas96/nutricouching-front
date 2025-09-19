import { useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import { FiUser } from "react-icons/fi";
import { MdEditNote, MdOutlineSchedule } from "react-icons/md";
import { TbHandFingerRight } from "react-icons/tb";
import ModalWindow from "../../../../common/components/dashboard/ModalWindow";
import useGetProfessionalSchedule from "../../../schedule/hooks/useGetProfessionalSchedule";
import useGetAllSpecialtiesByProfessional from "../../../specialties/hooks/useGetAllSpecialtiesByProfessional";
import useSelectSpecialty from "../../../specialties/hooks/useSelectSpecialty";
import useBookAppointment from "../../hooks/useBookAppointment";
import "./GetBooking.css";
import NetworkError from "../../../../common/components/NetworkError";
import GetBookingSkeleton from "../loaders/GetBookingSkeleton";
import ScheduleProfileSkeleton from "../../../schedule/components/loader/ScheduleProfileSkeleton";
import { es } from "date-fns/locale";

function GetBooking({
  professionalId,
  professionalName,
  onClose,
  availabilities,
  availabilitiesLoading,
  availabilitiesError,
}) {
  const {
    professionalSchedule,
    setSelectedDate,
    selectedDate,
    setSelectedTime,
    selectedTime,
    endTime,
    setEndTime,
    scheduleLoading,
    scheduleError,
  } = useGetProfessionalSchedule(professionalId);

  const { specialties, specialtiesError, specialtiesLoading, setSpecialties } =
    useGetAllSpecialtiesByProfessional(professionalId);

  const { selectSpecialty, selectedSpecialty } = useSelectSpecialty();

  const { handleSubmitBookAppointment } = useBookAppointment(
    onClose,
    professionalSchedule
  );

  // Hoy
  const today = new Date();

  // Hoy + 30 días
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30);

  const modalElement = useRef();

  //   A solucionar
  // Necesario para hacer scroll hacia el fondo cuando se agrega un valor
  useEffect(() => {
    if (modalElement.current) {
      modalElement.current.scrollTo({
        top: modalElement.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [selectedDate, selectedSpecialty, professionalSchedule]);

  const isEmptyAvailabilitiesList = Object.values(availabilities).every(
    (av) => av.length === 0
  );
  const isEmptySpecialtiesList = specialties.length === 0;

  const date = new Date(selectedDate);

  return (
    <ModalWindow
      title="Solicitar Turno"
      icon={<FiUser />}
      onSubmit={(e) =>
        handleSubmitBookAppointment(
          e,
          selectedDate,
          selectedTime,
          professionalId,
          selectedSpecialty.specialtyId
        )
      }
      onClose={onClose}
      buttonText="Confirmar Turno"
      isButtonEnabled={selectedDate && selectedTime && selectedSpecialty}
    >
      <div className="get-booking_modal" ref={modalElement}>
        {specialtiesError || availabilitiesError ? (
          <NetworkError message="Ha ocurrido un error" />
        ) : specialtiesLoading ? (
          <GetBookingSkeleton />
        ) : isEmptySpecialtiesList ? (
          <p className="warning">
            El profesional no definio sus especialidades aún
          </p>
        ) : isEmptyAvailabilitiesList ? (
          <p className="warning">El profesional no definio sus horarios aún</p>
        ) : (
          <div className="specialties-by-professional_list">
            <h2>
              <TbHandFingerRight /> Elije una especialidad
            </h2>
            <div>
              {specialties.length > 0 ? (
                specialties?.map((specialty) => (
                  <div key={specialty.specialtyId}>
                    <input
                      type="radio"
                      name="select-specialty"
                      id={`specialty-${specialty.specialtyId}`}
                      value={specialty.specialtyId}
                      onClick={() => selectSpecialty(specialty)}
                      className="radio-input"
                    />
                    <label htmlFor={`specialty-${specialty.specialtyId}`}>
                      {specialty.name}
                    </label>
                  </div>
                ))
              ) : (
                <p className="get-booking_no-options">
                  El profesional no designo especialidades
                </p>
              )}
            </div>
          </div>
        )}

        {selectedSpecialty && (
          <div className="date-picker">
            <h2 className="select-date">
              <TbHandFingerRight /> Seleccione una fecha
            </h2>
            <DayPicker
              locale={es}
              animate
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                setSelectedTime(null);
              }}
              disabled={[{ before: today }, { after: maxDate }]}
              className="myCalendar"
            />
          </div>
        )}

        {selectedDate && scheduleError ? (
          <NetworkError />
        ) : selectedDate && scheduleLoading ? (
          <ScheduleProfileSkeleton />
        ) : selectedDate && professionalSchedule?.length > 0 ? (
          <>
            <hr />

            <div className="available-times">
              <h2>
                <MdOutlineSchedule /> Horarios Disponibles
              </h2>
              <p>Selecciona un horario para tu consulta</p>

              <div className="times-list">
                {professionalSchedule?.map((sche) => (
                  <div key={sche.availabilityId}>
                    <input
                      type="radio"
                      name="select-time"
                      id={`select-time-${sche.availabilityId}`}
                      className="radio-input"
                      value={sche.startTime}
                      onClick={() => setSelectedTime(sche.startTime)}
                    />
                    <label htmlFor={`select-time-${sche.availabilityId}`}>
                      <MdOutlineSchedule />
                      {sche.startTime}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          !!selectedDate && (
            <p className="get-booking_no-options">
              No hay horarios disponibles
            </p>
          )
        )}

        {professionalName &&
          selectedSpecialty &&
          selectedDate &&
          selectedTime && (
            <div className="summary-booking">
              <h2>
                <MdEditNote /> Resumen del Turno
              </h2>

              <div>
                <div className="summary-details left">
                  <p>Profesional:</p>
                  <p>Especialidad:</p>
                  <p>Dia</p>
                  <p>Hora</p>
                </div>
                <div className="summary-details right">
                  <p>{professionalName}</p>
                  <p>{selectedSpecialty.name}</p>
                  <p>{date.toLocaleDateString("es-AR")}</p>
                  <p>{selectedTime}</p>
                </div>
              </div>
            </div>
          )}
      </div>
    </ModalWindow>
  );
}

export default GetBooking;
