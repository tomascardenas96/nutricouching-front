import { Helmet } from "react-helmet-async";
import DashboardContentLayout from "../../dashboard/layout/DashboardContentLayout";
import DashboardLayout from "../../dashboard/layout/DashboardLayout";
import RootDashboardContent from "../components/dashboard/RootDashboardContent";
import "./AdminDashboard.css";

function AdminDashboard() {
  return (
    <DashboardLayout>
      <DashboardContentLayout>
        <Helmet>
          <title>Root dashboard | Cohesiva Salud</title>
        </Helmet>

        <RootDashboardContent />
      </DashboardContentLayout>
    </DashboardLayout>
  );
}

export default AdminDashboard;
