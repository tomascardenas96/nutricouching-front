import useGetAllSpecialties from "../../../../hooks/useGetAllSpecialties";
import "./BookingsCard.css";

function BookingsCard({ name, specialty, startTimetable, endTimetable }) {
  const { errorSpecialties, loadingSpecialties, specialties } =
    useGetAllSpecialties();

  const getSpecialtyById = (specialtyId) => {
    const specialty = specialties?.find(
      (specialty) => specialty?.specialtyId === specialtyId
    );
    return specialty?.name;
  };

  return (
    <div className="bookings-card_container">
      <div className="left">
        <p>{name}</p>
        <p>{`${startTimetable}hs - ${endTimetable}hs`}</p>
      </div>

      <div className="right">
        <p>{getSpecialtyById(specialty)}</p>
        <button>Cancelar Turno</button>
      </div>
    </div>
  );
}

export default BookingsCard;
