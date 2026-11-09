import {
  Card,
  Col,
  Row,
  Statistic,
} from "antd";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  FieldTimeOutlined,
  TeamOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

import AttendanceForm from "../components/AttendanceForm";
import AttendanceTable from "../components/AttendanceTable";
import { useData } from "../contexts/DataContext";

function AttendancePage() {
  const {
    attendance,
    addAttendance,
    deleteAttendance,
  } = useData();

  const presentCount = attendance.filter(
    (item) => item.status === "Present"
  ).length;
  const lateCount = attendance.filter(
    (item) => item.status === "Late"
  ).length;
  const absentCount = attendance.filter(
    (item) => item.status === "Absent"
  ).length;

  return (
    <div className="dashboard-page">
      <div className="dashboard-hero">
        <div>
          <div className="hero-label">EMPLOYEE MANAGEMENT</div>
          <h1 className="dashboard-title">Attendance</h1>
          <p className="dashboard-subtitle">
            Monitor employee attendance and daily records
          </p>
        </div>
        <div className="hero-icon">
          <CalendarOutlined />
        </div>
      </div>

      <Row gutter={[20, 20]}>
        <Col xs={24} sm={12} xl={6}>
          <Card className="stat-card employees-card">
            <div className="stat-top">
              <div className="stat-icon">
                <TeamOutlined />
              </div>
              <span className="stat-badge">Records</span>
            </div>
            <Statistic title="Total Records" value={attendance.length} />
          </Card>
        </Col>

        <Col xs={24} sm={12} xl={6}>
          <Card className="stat-card present-card">
            <div className="stat-top">
              <div className="stat-icon">
                <CheckCircleOutlined />
              </div>
              <span className="stat-badge">Status</span>
            </div>
            <Statistic title="Present" value={presentCount} />
          </Card>
        </Col>

        <Col xs={24} sm={12} xl={6}>
          <Card className="stat-card performance-card">
            <div className="stat-top">
              <div className="stat-icon">
                <FieldTimeOutlined />
              </div>
              <span className="stat-badge">Status</span>
            </div>
            <Statistic title="Late" value={lateCount} />
          </Card>
        </Col>

        <Col xs={24} sm={12} xl={6}>
          <Card className="stat-card absent-card">
            <div className="stat-top">
              <div className="stat-icon">
                <CloseCircleOutlined />
              </div>
              <span className="stat-badge">Status</span>
            </div>
            <Statistic title="Absent" value={absentCount} />
          </Card>
        </Col>
      </Row>

      <AttendanceForm onAddAttendance={addAttendance} />

      <div>
        <AttendanceTable
          attendance={attendance}
          onDelete={deleteAttendance}
        />
      </div>
    </div>
  );
}

export default AttendancePage;