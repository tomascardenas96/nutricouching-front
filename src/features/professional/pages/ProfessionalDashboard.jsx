import DashboardContentLayout from "../../dashboard/components/layout/DashboardContentLayout";
import DashboardLayout from "../../dashboard/components/layout/DashboardLayout";
import ProfessionalDashboardContent from "../components/dashboard/ProfessionalDashboardContent";

function ProfessionalDashboard() {
  return (
    <DashboardLayout>
      <DashboardContentLayout>
        <ProfessionalDashboardContent />
      </DashboardContentLayout>
    </DashboardLayout>
  );
}

export default ProfessionalDashboard;
