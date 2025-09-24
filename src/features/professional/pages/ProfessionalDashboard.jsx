import { Helmet } from "react-helmet-async";
import DashboardContentLayout from "../../dashboard/layout/DashboardContentLayout";
import DashboardLayout from "../../dashboard/layout/DashboardLayout";
import ProfessionalDashboardContent from "../../professional/components/dashboard/admin/ProfessionalDashboardContent";

function ProfessionalDashboard() {
  document.title = "Dashboard usuario profesional - Cohesiva";

  return (
    <DashboardLayout>
      <DashboardContentLayout>
        <Helmet>
          <title>Professional dashboard | Cohesiva Salud</title>
        </Helmet>

        <ProfessionalDashboardContent />
      </DashboardContentLayout>
    </DashboardLayout>
  );
}

export default ProfessionalDashboard;
