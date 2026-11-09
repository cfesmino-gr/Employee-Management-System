import { Button, Popconfirm, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";

import type { Employee } from "../types/employee";

interface EmployeeTableProps {
  employees: Employee[];
  onDelete: (id: number) => void;
}

function EmployeeTable({ employees, onDelete }: EmployeeTableProps) {
  const columns: ColumnsType<Employee> = [
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Employee["status"]) => (
        <Tag color={status === "Active" ? "green" : "red"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, employee: Employee) => (
        <Popconfirm
          title="Delete employee?"
          description="Are you sure you want to delete this employee?"
          onConfirm={() => onDelete(employee.id)}
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

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={employees}
      scroll={{ x: 900 }}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20", "50"],
        showTotal: (total) => `Total ${total} employees`,
      }}
      locale={{
        emptyText: "No employees added yet",
      }}
    />
  );
}

export default EmployeeTable;