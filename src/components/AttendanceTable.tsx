import { useMemo, useState } from "react";
import dayjs from "dayjs";

import {
  Button,
  Card,
  DatePicker,
  Input,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
} from "antd";

import type { ColumnsType } from "antd/es/table";

import {
  SearchOutlined,
  ReloadOutlined,
  DownloadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import {
  ATTENDANCE_STATUS_OPTIONS,
  getAttendanceStatusColor,
} from "../constants";
import type { Attendance } from "../types/employee";

interface AttendanceTableProps {
  attendance: Attendance[];
  onDelete: (id: number) => void;
}

function AttendanceTable({
  attendance,
  onDelete,
}: AttendanceTableProps) {
  const [searchText, setSearchText] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedDate, setSelectedDate] =
    useState("");

  const filteredAttendance = useMemo(() => {
    return attendance.filter((record) => {
      const search =
        searchText
          .toLowerCase()
          .trim();

      const matchesSearch =
        search === "" ||
        record.employeeId
          .toLowerCase()
          .includes(search) ||
        record.employeeName
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        record.status ===
          statusFilter;

      const matchesDate =
        selectedDate === "" ||
        record.date === selectedDate;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDate
      );
    });
  }, [
    attendance,
    searchText,
    statusFilter,
    selectedDate,
  ]);

  const columns: ColumnsType<Attendance> = [
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
      width: 140,
    },
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
      width: 200,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 130,
    },
    {
      title: "Time In",
      dataIndex: "timeIn",
      key: "timeIn",
      width: 120,
      render: (timeIn: string) =>
        timeIn || "—",
    },
    {
      title: "Time Out",
      dataIndex: "timeOut",
      key: "timeOut",
      width: 120,
      render: (timeOut: string) =>
        timeOut || "—",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (
        status: Attendance["status"]
      ) => (
        <Tag
          color={getAttendanceStatusColor(status)}
          style={{
            minWidth: 75,
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      render: (_: unknown, record: Attendance) => (
        <Popconfirm
          title="Delete record?"
          description="Are you sure you want to delete this attendance record?"
          onConfirm={() => onDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const handleReset = () => {
    setSearchText("");
    setStatusFilter("All");
    setSelectedDate("");
  };

  const handleDateChange = (
    date: dayjs.Dayjs | null
  ) => {
    if (!date) {
      setSelectedDate("");
      return;
    }

    setSelectedDate(
      date.format("YYYY-MM-DD")
    );
  };

  const handleExport = () => {
    const headers = [
      "Employee ID",
      "Employee Name",
      "Date",
      "Time In",
      "Time Out",
      "Status",
    ];

    const rows =
      filteredAttendance.map(
        (record) => [
          record.employeeId,
          record.employeeName,
          record.date,
          record.timeIn || "",
          record.timeOut || "",
          record.status,
        ]
      );

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map(
            (value) =>
              `"${String(
                value
              ).replace(
                /"/g,
                '""'
              )}"`
          )
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob(
      [csv],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "attendance-report.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <Card
      title="Attendance Records"
      extra={
        <Button
          icon={
            <DownloadOutlined />
          }
          onClick={handleExport}
          disabled={
            filteredAttendance.length ===
            0
          }
        >
          Export
        </Button>
      }
    >
      <Space
        wrap
        style={{
          width: "100%",
          marginBottom: 20,
        }}
      >
        <Input
          allowClear
          value={searchText}
          onChange={(event) =>
            setSearchText(
              event.target.value
            )
          }
          prefix={
            <SearchOutlined />
          }
          placeholder="Search employee..."
          style={{ width: 250 }}
        />

        <Select
          value={statusFilter}
          onChange={setStatusFilter}
          style={{ width: 150 }}
          options={[
            {
              value: "All",
              label: "All Status",
            },
            ...ATTENDANCE_STATUS_OPTIONS,
          ]}
        />

        <DatePicker
          placeholder="Select date"
          onChange={handleDateChange}
        />

        <Button
          icon={
            <ReloadOutlined />
          }
          onClick={handleReset}
        >
          Reset
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredAttendance}
        rowKey="id"
        scroll={{ x: 980 }}
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: [
            "5",
            "10",
            "20",
            "50",
          ],
          showTotal: (total) =>
            `Total ${total} attendance records`,
        }}
        locale={{
          emptyText:
            "No attendance records found.",
        }}
      />
    </Card>
  );
}

export default AttendanceTable;