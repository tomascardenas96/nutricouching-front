import DashboardContentLayout from "../../dashboard/components/layout/DashboardContentLayout";
import DashboardLayout from "../../dashboard/components/layout/DashboardLayout";
import RootDashboardContent from "../components/RootDashboardContent";
import "./AdminDashboard.css";

function AdminDashboard() {
  document.title = "Dashboard usuario root - Cohesiva";

  return (
    <DashboardLayout>
      <DashboardContentLayout>
        <RootDashboardContent />
      </DashboardContentLayout>
    </DashboardLayout>
  );
}

export default AdminDashboard;
