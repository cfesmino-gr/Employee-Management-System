import Dashboard from "../components/Dashboard";
import { useData } from "../contexts/DataContext";

function DashboardPage() {
  const {
    totalEmployees,
    presentToday,
    absentToday,
    averagePerformance,
  } = useData();

  return (
    <Dashboard
      totalEmployees={totalEmployees}
      presentToday={presentToday}
      absentToday={absentToday}
      averagePerformance={averagePerformance}
    />
  );
}

export default DashboardPage;