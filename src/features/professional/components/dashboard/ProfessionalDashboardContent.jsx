import { useSelectMenuOption } from "../../../dashboard/hooks/useSelectMenuOption";
import BookingsProfessionalDashboard from "./sections/bookings/BookingsProfessionalDashboard";
import SchedulesProfessionalDashboard from "./sections/schedules/SchedulesProfessionalDashboard";
import SpecialtiesProfessionalDashboard from "./sections/specialties/SpecialtiesProfessionalDashboard";

function ProfessionalDashboardContent() {
  const { selectedOption } = useSelectMenuOption();

  if (selectedOption === "Turnos") return <BookingsProfessionalDashboard />;
  if (selectedOption === "Horarios de Atencion")
    return <SchedulesProfessionalDashboard />;
  if (selectedOption === "Especialidades")
    return <SpecialtiesProfessionalDashboard />;
}

export default ProfessionalDashboardContent;
