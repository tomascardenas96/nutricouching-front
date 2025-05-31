import DashboardContentLayout from "../../dashboard/layout/DashboardContentLayout";
import DashboardLayout from "../../dashboard/layout/DashboardLayout";
import ProfessionalDashboardContent from "../../professional/components/dashboard/admin/ProfessionalDashboardContent";

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
