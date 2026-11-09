import {
  Button,
  Card,
  Col,
  Dropdown,
  Row,
  Statistic,
  Table,
  Tag,
} from "antd";

import {
  TeamOutlined,
  CheckCircleOutlined,
  LineChartOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  DownloadOutlined,
  FileExcelOutlined,
  CodeOutlined,
} from "@ant-design/icons";

import { useData } from "../contexts/DataContext";
import { downloadCsv, downloadJson } from "../utils/export";

import type { Employee } from "../types/employee";

interface ReportRow {
  key: number;
  employeeId: string;
  name: string;
  department: string;
  attendance: number;
  performance: number;
  status: string;
}

function statusFor(performance: number): string {
  if (performance >= 90) return "Excellent";
  if (performance >= 70) return "Good";
  return "Needs Improvement";
}

function ReportPage() {
  const { employees, attendance, performances } = useData();

  const reportData: ReportRow[] = employees.map((employee: Employee) => {
    const employeeAttendance = attendance.filter(
      (record) =>
        String(record.employeeId) === String(employee.employeeId)
    );

    const presentCount = employeeAttendance.filter(
      (record) => record.status === "Present"
    ).length;

    const attendancePercentage =
      employeeAttendance.length > 0
        ? Math.round((presentCount / employeeAttendance.length) * 100)
        : 0;

    const employeePerformance = performances.filter(
      (record) =>
        String(record.employeeId) === String(employee.employeeId)
    );

    const performanceTotal = employeePerformance.reduce(
      (total, record) => total + Number(record.overallScore || 0),
      0
    );

    const performancePercentage =
      employeePerformance.length > 0
        ? Number(
            (performanceTotal / employeePerformance.length).toFixed(1)
          )
        : 0;

    return {
      key: employee.id,
      employeeId: String(employee.employeeId || "N/A"),
      name: employee.name || "N/A",
      department: employee.department || "N/A",
      attendance: attendancePercentage,
      performance: performancePercentage,
      status: statusFor(performancePercentage),
    };
  });

  const totalEmployees = reportData.length;

  const averageAttendance =
    totalEmployees > 0
      ? Number(
          (
            reportData.reduce(
              (total, employee) => total + employee.attendance,
              0
            ) / totalEmployees
          ).toFixed(1)
        )
      : 0;

  const averagePerformance =
    totalEmployees > 0
      ? Number(
          (
            reportData.reduce(
              (total, employee) => total + employee.performance,
              0
            ) / totalEmployees
          ).toFixed(1)
        )
      : 0;

  const needsImprovement = reportData.filter(
    (employee) => employee.status === "Needs Improvement"
  ).length;

  const handleDownloadCsv = () => {
    const rows = reportData.map((employee) => ({
      "Employee ID": employee.employeeId,
      "Employee Name": employee.name,
      Department: employee.department,
      "Attendance (%)": employee.attendance,
      "Performance (%)": employee.performance,
      Status: employee.status,
    }));
    downloadCsv("employee-performance-report.csv", rows);
  };

  const handleDownloadJson = () => {
    downloadJson("employee-performance-report.json", reportData);
  };

  const downloadMenuItems = [
    {
      key: "csv",
      label: "Download CSV",
      icon: <FileExcelOutlined />,
      onClick: handleDownloadCsv,
    },
    {
      key: "json",
      label: "Download JSON",
      icon: <CodeOutlined />,
      onClick: handleDownloadJson,
    },
  ];

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "Employee Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Attendance",
      dataIndex: "attendance",
      key: "attendance",
      render: (value: number) => `${value}%`,
    },
    {
      title: "Performance",
      dataIndex: "performance",
      key: "performance",
      render: (value: number) => `${value}%`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color =
          status === "Excellent" ? "green" : status === "Good" ? "blue" : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <div className="report-page">
      <div className="dashboard-hero">
        <div>
          <div className="hero-label">EMPLOYEE MANAGEMENT</div>
          <h1 className="dashboard-title">Performance Reports</h1>
          <p className="dashboard-subtitle">
            Employee attendance and performance summary
          </p>
        </div>
        <div className="hero-icon">
          <FileTextOutlined />
        </div>
      </div>

      <Row gutter={[20, 20]}>
        <Col xs={24} sm={12} xl={6}>
          <Card className="stat-card employees-card">
            <div className="stat-top">
              <div className="stat-icon">
                <TeamOutlined />
              </div>
              <span className="stat-badge">Workforce</span>
            </div>
            <Statistic title="Total Employees" value={totalEmployees} />
          </Card>
        </Col>

        <Col xs={24} sm={12} xl={6}>
          <Card className="stat-card present-card">
            <div className="stat-top">
              <div className="stat-icon">
                <CheckCircleOutlined />
              </div>
              <span className="stat-badge">Attendance</span>
            </div>
            <Statistic
              title="Average Attendance"
              value={averageAttendance}
              suffix="%"
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} xl={6}>
          <Card className="stat-card performance-card">
            <div className="stat-top">
              <div className="stat-icon">
                <LineChartOutlined />
              </div>
              <span className="stat-badge">Overall</span>
            </div>
            <Statistic
              title="Average Performance"
              value={averagePerformance}
              suffix="%"
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} xl={6}>
          <Card className="stat-card absent-card">
            <div className="stat-top">
              <div className="stat-icon">
                <ExclamationCircleOutlined />
              </div>
              <span className="stat-badge">Attention</span>
            </div>
            <Statistic
              title="Needs Improvement"
              value={needsImprovement}
            />
          </Card>
        </Col>
      </Row>

      <Card className="dashboard-panel">
        <div className="panel-heading">
          <div>
            <h2>Employee Performance Report</h2>
            <p>Attendance and performance records for all employees</p>
          </div>
          <div className="panel-actions">
            <Dropdown menu={{ items: downloadMenuItems }} placement="bottomRight">
              <Button type="primary" icon={<DownloadOutlined />}>
                Download
              </Button>
            </Dropdown>
            <div className="panel-icon">
              <FileTextOutlined />
            </div>
          </div>
        </div>

        <Table
          rowKey="key"
          columns={columns}
          dataSource={reportData}
          pagination={false}
          scroll={{ x: 800 }}
          locale={{
            emptyText: "No employee records available",
          }}
        />
      </Card>
    </div>
  );
}

export default ReportPage;