import { Card } from "antd";

import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import { useData } from "../contexts/DataContext";

function EmployeesPage() {
  const { employees, addEmployee, deleteEmployee } = useData();

  return (
    <>
      <Card title="Add Employee" style={{ marginBottom: 24 }}>
        <EmployeeForm onAddEmployee={addEmployee} />
      </Card>

      <Card title="Employee List">
        <EmployeeTable employees={employees} onDelete={deleteEmployee} />
      </Card>
    </>
  );
}

export default EmployeesPage;