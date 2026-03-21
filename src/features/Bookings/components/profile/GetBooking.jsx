import { useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import { FiUser } from "react-icons/fi";
import { MdOutlineSchedule } from "react-icons/md";
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

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30);

  const modalElement = useRef();

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

  const dayKeyToIndex = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const allDays = [0, 1, 2, 3, 4, 5, 6];
  const workingDays = new Set(
    Object.entries(availabilities)
      .filter(([, slots]) => slots && slots.length > 0)
      .map(([day]) => dayKeyToIndex[day])
  );
  const disabledDaysOfWeek = allDays.filter((d) => !workingDays.has(d));

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
      size="lg"
    >
      <div className="get-booking_modal" ref={modalElement}>
        {specialtiesError || availabilitiesError ? (
          <NetworkError message="Ha ocurrido un error" />
        ) : specialtiesLoading ? (
          <GetBookingSkeleton />
        ) : isEmptySpecialtiesList ? (
          <p className="gb-empty">
            El profesional no definió sus especialidades aún
          </p>
        ) : isEmptyAvailabilitiesList ? (
          <p className="gb-empty">
            El profesional no definió sus horarios aún
          </p>
        ) : (
          <div className="gb-step">
            <div className="gb-step__header">
              <span className="gb-step__number">1</span>
              <h2 className="gb-step__title">Especialidad</h2>
            </div>
            <p className="gb-step__subtitle">
              Elegí el tipo de consulta que necesitás
            </p>
            <div className="gb-specialties">
              {specialties.map((specialty) => (
                <div
                  key={specialty.specialtyId}
                  className="gb-specialty-option"
                >
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
              ))}
            </div>
          </div>
        )}

        {selectedSpecialty && (
          <div className="gb-step" style={{ animationDelay: "0.05s" }}>
            <div className="gb-step__header">
              <span className="gb-step__number">2</span>
              <h2 className="gb-step__title">Fecha</h2>
            </div>
            <p className="gb-step__subtitle">
              Seleccioná un día dentro de los próximos 30 días
            </p>
            <div className="gb-calendar-wrap">
              <DayPicker
                locale={es}
                animate
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  setSelectedTime(null);
                }}
                disabled={[
                  { before: today },
                  { after: maxDate },
                  { dayOfWeek: disabledDaysOfWeek },
                ]}
                className="myCalendar"
              />
            </div>
          </div>
        )}

        {selectedDate && scheduleError ? (
          <NetworkError />
        ) : selectedDate && scheduleLoading ? (
          <ScheduleProfileSkeleton />
        ) : selectedDate && professionalSchedule?.length > 0 ? (
          <div className="gb-step" style={{ animationDelay: "0.05s" }}>
            <div className="gb-step__header">
              <span className="gb-step__number">3</span>
              <h2 className="gb-step__title">Horario</h2>
            </div>
            <p className="gb-step__subtitle">
              Elegí el horario que mejor te quede
            </p>
            <div className="gb-times-grid">
              {professionalSchedule.map((sche) => (
                <div key={sche.availabilityId} className="gb-time-option">
                  <input
                    type="radio"
                    name="select-time"
                    id={`select-time-${sche.availabilityId}`}
                    className="radio-input"
                    value={sche.startTime}
                    onClick={() => setSelectedTime(sche.startTime)}
                  />
                  <label htmlFor={`select-time-${sche.availabilityId}`}>
                    <span className="gb-time-icon">
                      <MdOutlineSchedule />
                    </span>
                    {sche.startTime}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ) : (
          !!selectedDate && (
            <p className="gb-no-times">No hay horarios disponibles</p>
          )
        )}

        {professionalName &&
          selectedSpecialty &&
          selectedDate &&
          selectedTime && (
            <div className="gb-step gb-summary">
              <div className="gb-step__header">
                <span className="gb-step__number">4</span>
                <h2 className="gb-step__title">Resumen</h2>
              </div>
              <div className="gb-summary-card">
                <div className="gb-summary-row">
                  <span className="gb-summary-label">Profesional</span>
                  <span className="gb-summary-value">{professionalName}</span>
                </div>
                <div className="gb-summary-row">
                  <span className="gb-summary-label">Especialidad</span>
                  <span className="gb-summary-value">
                    {selectedSpecialty.name}
                  </span>
                </div>
                <div className="gb-summary-row">
                  <span className="gb-summary-label">Fecha</span>
                  <span className="gb-summary-value">
                    {date.toLocaleDateString("es-AR")}
                  </span>
                </div>
                <div className="gb-summary-row">
                  <span className="gb-summary-label">Hora</span>
                  <span className="gb-summary-value">{selectedTime}</span>
                </div>
              </div>
            </div>
          )}
      </div>
    </ModalWindow>
  );
}

export default GetBooking;
