import DashboardContentLayout from "../../dashboard/components/layout/DashboardContentLayout";
import DashboardLayout from "../../dashboard/components/layout/DashboardLayout";
import ProfessionalDashboardContent from "../components/dashboard/ProfessionalDashboardContent";

function ProfessionalDashboard() {
  document.title = "Dashboard usuario profesional - Cohesiva";

  return (
    <DashboardLayout>
      <DashboardContentLayout>
        <ProfessionalDashboardContent />
      </DashboardContentLayout>
    </DashboardLayout>
  );
}

export default ProfessionalDashboard;
