import { useMemo, useState } from "react";

import {
  Button,
  Card,
  Col,
  Empty,
  Input,
  Popconfirm,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
} from "antd";

import type { ColumnsType } from "antd/es/table";

import {
  AuditOutlined,
  DeleteOutlined,
  LineChartOutlined,
  ReloadOutlined,
  SearchOutlined,
  StarOutlined,
} from "@ant-design/icons";

import PerformanceForm from "../components/PerformanceForm";
import { useData } from "../contexts/DataContext";

import {
  DEPARTMENT_OPTIONS,
  PERFORMANCE_RATINGS,
  getRatingColor,
} from "../constants";

import type { Performance } from "../types/employee";

function PerformancePage() {
  const { employees, performances, addPerformance, clearPerformances } =
    useData();

  const [searchText, setSearchText] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");

  const filteredPerformances = useMemo(() => {
    const search = searchText.toLowerCase().trim();

    return performances.filter((performance) => {
      const employee = employees.find(
        (item) => item.employeeId === performance.employeeId
      );

      const matchesSearch =
        search === "" ||
        performance.employeeId.toLowerCase().includes(search) ||
        performance.employeeName.toLowerCase().includes(search);

      const matchesRating =
        ratingFilter === "All" || performance.rating === ratingFilter;

      const matchesDepartment =
        departmentFilter === "All" ||
        employee?.department === departmentFilter;

      return matchesSearch && matchesRating && matchesDepartment;
    });
  }, [performances, employees, searchText, ratingFilter, departmentFilter]);

  const totalEvaluations = performances.length;

  const averageScore =
    performances.length > 0
      ? performances.reduce(
          (total, performance) => total + performance.overallScore,
          0
        ) / performances.length
      : 0;

  const excellentCount = performances.filter(
    (performance) => performance.rating === "Excellent"
  ).length;

  const handleReset = () => {
    setSearchText("");
    setRatingFilter("All");
    setDepartmentFilter("All");
  };

  const columns: ColumnsType<Performance> = [
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
      width: 130,
      fixed: "left",
    },
    {
      title: "Employee",
      dataIndex: "employeeName",
      key: "employeeName",
      width: 190,
      fixed: "left",
    },
    {
      title: "Quality",
      dataIndex: "quality",
      key: "quality",
      width: 100,
      render: (value: number) => `${value}%`,
    },
    {
      title: "Productivity",
      dataIndex: "productivity",
      key: "productivity",
      width: 115,
      render: (value: number) => `${value}%`,
    },
    {
      title: "Teamwork",
      dataIndex: "teamwork",
      key: "teamwork",
      width: 100,
      render: (value: number) => `${value}%`,
    },
    {
      title: "Communication",
      dataIndex: "communication",
      key: "communication",
      width: 125,
      render: (value: number) => `${value}%`,
    },
    {
      title: "Overall Score",
      dataIndex: "overallScore",
      key: "overallScore",
      width: 140,
      render: (score: number) => <strong>{score.toFixed(2)}%</strong>,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      width: 160,
      render: (rating: string) => (
        <Tag
          color={getRatingColor(rating)}
          style={{ minWidth: 110, textAlign: "center", fontWeight: 500 }}
        >
          {rating}
        </Tag>
      ),
    },
  ];

  const ratingOptions = [
    { value: "All", label: "All Ratings" },
    ...PERFORMANCE_RATINGS.map((rating) => ({
      value: rating,
      label: rating,
    })),
  ];

  const departmentOptions = [
    { value: "All", label: "All Departments" },
    ...DEPARTMENT_OPTIONS,
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-hero">
        <div>
          <div className="hero-label">EMPLOYEE MANAGEMENT</div>
          <h1 className="dashboard-title">Performance</h1>
          <p className="dashboard-subtitle">
            Employee performance management
          </p>
        </div>
        <div className="hero-icon">
          <LineChartOutlined />
        </div>
      </div>

      <Row gutter={[20, 20]}>
        <Col xs={24} sm={12} lg={8}>
          <Card className="stat-card employees-card">
            <div className="stat-top">
              <div className="stat-icon">
                <AuditOutlined />
              </div>
              <span className="stat-badge">Evaluations</span>
            </div>
            <Statistic title="Total Evaluations" value={totalEvaluations} />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card className="stat-card performance-card">
            <div className="stat-top">
              <div className="stat-icon">
                <LineChartOutlined />
              </div>
              <span className="stat-badge">Average</span>
            </div>
            <Statistic
              title="Average Performance"
              value={averageScore}
              precision={2}
              suffix="%"
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card className="stat-card present-card">
            <div className="stat-top">
              <div className="stat-icon">
                <StarOutlined />
              </div>
              <span className="stat-badge">Top</span>
            </div>
            <Statistic
              title="Excellent Ratings"
              value={excellentCount}
              prefix={<StarOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="Performance Evaluation"
        style={{ marginBottom: 24 }}
      >
        <PerformanceForm
          employees={employees}
          onAddPerformance={addPerformance}
        />
      </Card>

      <Card
        title="Performance Records"
        extra={
          <Space size="small">
            <Tag color="blue">{filteredPerformances.length} Records</Tag>
            <Popconfirm
              title="Clear all performance records?"
              description="This will permanently remove every performance evaluation."
              okText="Clear All"
              cancelText="Cancel"
              okButtonProps={{ danger: true }}
              onConfirm={clearPerformances}
              disabled={performances.length === 0}
            >
              <Button
                danger
                size="small"
                icon={<DeleteOutlined />}
                disabled={performances.length === 0}
              >
                Clear All
              </Button>
            </Popconfirm>
          </Space>
        }
      >
        <Space
          wrap
          style={{ width: "100%", marginBottom: 20 }}
        >
          <Input
            allowClear
            prefix={<SearchOutlined />}
            placeholder="Search employee..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            style={{ width: 250 }}
          />

          <Select
            value={ratingFilter}
            onChange={setRatingFilter}
            style={{ width: 180 }}
            options={ratingOptions}
          />

          <Select
            value={departmentFilter}
            onChange={setDepartmentFilter}
            style={{ width: 220 }}
            options={departmentOptions}
          />

          <button
            type="button"
            onClick={handleReset}
            className="toolbar-reset-btn"
          >
            <ReloadOutlined />
            Reset
          </button>
        </Space>

        <Table
          columns={columns}
          dataSource={filteredPerformances}
          rowKey="id"
          scroll={{ x: 1250 }}
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "50"],
            showTotal: (total) => `Total ${total} performance records`,
          }}
          locale={{
            emptyText: (
              <Empty
                description={
                  performances.length === 0
                    ? "No performance records yet. Add an evaluation above."
                    : "No matching performance records."
                }
              />
            ),
          }}
        />
      </Card>
    </div>
  );
}

export default PerformancePage;