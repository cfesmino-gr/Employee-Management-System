import {
  TeamOutlined,
  CheckCircleOutlined,
  UserDeleteOutlined,
  LineChartOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import {
  Card,
  Col,
  Row,
  Statistic,
  Progress,
} from "antd";

interface DashboardProps {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  averagePerformance: number;
}

function Dashboard({
  totalEmployees,
  presentToday,
  absentToday,
  averagePerformance,
}: DashboardProps) {
  const attendanceRate =
    totalEmployees > 0
      ? Math.round(
          (presentToday / totalEmployees) *
            100
        )
      : 0;

  return (
    <div className="dashboard-page">
      <div className="dashboard-hero">
        <div>
          <div className="hero-label">
            EMPLOYEE MANAGEMENT
          </div>

          <h1 className="dashboard-title">
            Dashboard Overview
          </h1>

          <p className="dashboard-subtitle">
            Monitor employee attendance,
            performance, and workforce
            activity in one place.
          </p>
        </div>

        <div className="hero-icon">
          <LineChartOutlined />
        </div>
      </div>

      <Row gutter={[20, 20]}>
        <Col xs={24} sm={12} xl={6}>
          <Card className="stat-card employees-card">
            <div className="stat-top">
              <div className="stat-icon">
                <TeamOutlined />
              </div>

              <span className="stat-badge">
                Workforce
              </span>
            </div>

            <Statistic
              title="Total Employees"
              value={totalEmployees}
            />

            <div className="stat-footer">
              <ArrowUpOutlined />
              <span>
                Active employee records
              </span>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} xl={6}>
          <Card className="stat-card present-card">
            <div className="stat-top">
              <div className="stat-icon">
                <CheckCircleOutlined />
              </div>

              <span className="stat-badge">
                Today
              </span>
            </div>

            <Statistic
              title="Present Today"
              value={presentToday}
            />

            <div className="stat-footer">
              <span>
                Employees present today
              </span>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} xl={6}>
          <Card className="stat-card absent-card">
            <div className="stat-top">
              <div className="stat-icon">
                <UserDeleteOutlined />
              </div>

              <span className="stat-badge">
                Today
              </span>
            </div>

            <Statistic
              title="Absent Today"
              value={absentToday}
            />

            <div className="stat-footer">
              <span>
                Attendance requires attention
              </span>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} xl={6}>
          <Card className="stat-card performance-card">
            <div className="stat-top">
            <div className="stat-icon">
              <LineChartOutlined />
            </div>

              <span className="stat-badge">
                Overall
              </span>
            </div>

            <Statistic
              title="Average Performance"
              value={Number(
                averagePerformance.toFixed(1)
              )}
              suffix="%"
            />

            <div className="stat-footer">
              <span>
                Based on performance records
              </span>
            </div>
          </Card>
        </Col>
      </Row>

      <Row
        gutter={[20, 20]}
        className="dashboard-lower-row"
      >
        <Col xs={24} lg={15}>
          <Card className="dashboard-panel">
            <div className="panel-heading">
              <div>
                <h2>Attendance Overview</h2>
                <p>
                  Today's employee attendance
                  status
                </p>
              </div>

              <div className="panel-icon">
                <CheckCircleOutlined />
              </div>
            </div>

            <div className="attendance-overview">
              <div className="attendance-progress">
                <Progress
                  type="circle"
                  percent={attendanceRate}
                  size={150}
                  strokeWidth={9}
                  format={(percent) =>
                    `${percent}%`
                  }
                />
              </div>

              <div className="attendance-details">
                <div className="attendance-item">
                  <div className="attendance-label">
                    <span className="legend present" />
                    Present
                  </div>

                  <strong>
                    {presentToday}
                  </strong>
                </div>

                <div className="attendance-item">
                  <div className="attendance-label">
                    <span className="legend absent" />
                    Absent
                  </div>

                  <strong>
                    {absentToday}
                  </strong>
                </div>

                <div className="attendance-item">
                  <div className="attendance-label">
                    <span className="legend total" />
                    Total Employees
                  </div>

                  <strong>
                    {totalEmployees}
                  </strong>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={9}>
          <Card className="dashboard-panel performance-summary">
            <div className="panel-heading">
              <div>
                <h2>Performance Summary</h2>
                <p>
                  Overall workforce score
                </p>
              </div>

              <div className="panel-icon">
                <LineChartOutlined />
              </div>
            </div>

            <div className="performance-score">
              <div className="score-number">
                {Number(
                  averagePerformance.toFixed(1)
                )}
                <span>%</span>
              </div>

              <Progress
                percent={Math.round(
                  averagePerformance
                )}
                showInfo={false}
                strokeWidth={8}
              />

              <div className="score-description">
                <span>
                  Current average performance
                </span>

                <strong>
                  {averagePerformance >= 90
                    ? "Excellent"
                    : averagePerformance >= 80
                    ? "Very Good"
                    : averagePerformance >= 70
                    ? "Good"
                    : averagePerformance >= 60
                    ? "Fair"
                    : "Needs Improvement"}
                </strong>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;