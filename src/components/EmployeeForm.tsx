import { useState } from "react";

import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Spin,
} from "antd";

import {
  UserOutlined,
  IdcardOutlined,
  MailOutlined,
  ApartmentOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import { DEPARTMENT_OPTIONS, EMPLOYEE_STATUS_OPTIONS } from "../constants";

import type { Employee } from "../types/employee";

interface EmployeeFormProps {
  onAddEmployee: (employee: Employee) => void;
}

function EmployeeForm({ onAddEmployee }: EmployeeFormProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: Omit<Employee, "id">) => {
    setLoading(true);

    setTimeout(() => {
      const newEmployee: Employee = {
        id: Date.now(),
        ...values,
      };

      onAddEmployee(newEmployee);
      form.resetFields();
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-box">
            <Spin size="large" />
            <h3>Adding Employee...</h3>
            <p>Please wait while the employee is being added.</p>
          </div>
        </div>
      )}

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Employee ID"
          name="employeeId"
          rules={[
            {
              required: true,
              message: "Please enter employee ID",
            },
          ]}
        >
          <Input
            size="large"
            prefix={<IdcardOutlined />}
            placeholder="Example: EMP-001"
          />
        </Form.Item>

        <Form.Item
          label="Employee Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter employee name",
            },
          ]}
        >
          <Input
            size="large"
            prefix={<UserOutlined />}
            placeholder="Enter employee name"
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email",
            },
          ]}
        >
          <Input
            size="large"
            prefix={<MailOutlined />}
            placeholder="employee@example.com"
          />
        </Form.Item>

        <Form.Item
          label="Department"
          name="department"
          rules={[
            {
              required: true,
              message: "Please select department",
            },
          ]}
        >
          <Select
            size="large"
            placeholder="Select department"
            options={DEPARTMENT_OPTIONS}
          />
        </Form.Item>

        <Form.Item
          label="Position"
          name="position"
          rules={[
            {
              required: true,
              message: "Please enter position",
            },
          ]}
        >
          <Input
            size="large"
            prefix={<ApartmentOutlined />}
            placeholder="Example: Sales Staff"
          />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          initialValue="Active"
        >
          <Select
            size="large"
            options={EMPLOYEE_STATUS_OPTIONS}
          />
        </Form.Item>

        <Space>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            size="large"
            loading={loading}
          >
            Add Employee
          </Button>

          <Button
            htmlType="reset"
            size="large"
            disabled={loading}
          >
            Clear
          </Button>
        </Space>
      </Form>
    </>
  );
}

export default EmployeeForm;