import { useSelectMenuOption } from "../../../../dashboard/hooks/useSelectMenuOption.js";
import BookingsProfessionalDashboard from "../../../../bookings/components/dashboard/professional/BookingsProfessionalDashboard";
import SchedulesProfessionalDashboard from "../../../../schedule/components/dashboard/professional/SchedulesProfessionalDashboard";
import SpecialtiesProfessionalDashboard from "../../../../specialties/components/dashboard/professional/SpecialtiesProfessionalDashboard";
import BookingsProfessionalDashboardMobile from "../../../../bookings/components/dashboard/professional/mobile/BookingsProfessionalDashboardMobile.jsx";
import SchedulesProfessionalDashboardMobile from "../../../../schedule/components/dashboard/professional/mobile/SchedulesProfessionalDashboardMobile.jsx";
import SpecialtiesProfessionalDashboardMobile from "../../../../specialties/components/dashboard/professional/mobile/SpecialtiesProfessionalDashboardMobile"

function ProfessionalDashboardContent() {
  const { selectedOption } = useSelectMenuOption();

  if (selectedOption === "Turnos")
    return (
      <>
        <BookingsProfessionalDashboard />
        <BookingsProfessionalDashboardMobile />
      </>
    );

  if (selectedOption === "Horarios de Atencion")
    return (
      <>
        <SchedulesProfessionalDashboard />
        <SchedulesProfessionalDashboardMobile />
      </>
    );

  if (selectedOption === "Especialidades")
    return (
      <>
        <SpecialtiesProfessionalDashboard />
        <SpecialtiesProfessionalDashboardMobile />
      </>
    );
}

export default ProfessionalDashboardContent;
