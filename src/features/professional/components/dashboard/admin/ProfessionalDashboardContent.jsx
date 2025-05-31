import { useSelectMenuOption } from "../../../../dashboard/hooks/useSelectMenuOption.js";
import BookingsProfessionalDashboard from "../../../../bookings/components/dashboard/professional/BookingsProfessionalDashboard";
import SchedulesProfessionalDashboard from "../../../../schedule/components/dashboard/professional/SchedulesProfessionalDashboard";
import SpecialtiesProfessionalDashboard from "../../../../specialties/components/dashboard/professional/SpecialtiesProfessionalDashboard";

function ProfessionalDashboardContent() {
  const { selectedOption } = useSelectMenuOption();

  if (selectedOption === "Turnos") return <BookingsProfessionalDashboard />;
  if (selectedOption === "Horarios de Atencion")
    return <SchedulesProfessionalDashboard />;
  if (selectedOption === "Especialidades")
    return <SpecialtiesProfessionalDashboard />;
}

export default ProfessionalDashboardContent;
