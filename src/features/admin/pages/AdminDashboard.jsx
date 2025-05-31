import DashboardContentLayout from "../../dashboard/layout/DashboardContentLayout";
import DashboardLayout from "../../dashboard/layout/DashboardLayout";
import RootDashboardContent from "../components/dashboard/RootDashboardContent";
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
