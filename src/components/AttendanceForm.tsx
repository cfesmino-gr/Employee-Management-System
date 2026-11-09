import { Form, Input, DatePicker, TimePicker, Select, Button, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { ATTENDANCE_STATUS_OPTIONS } from "../constants";

import type { Attendance } from "../types/employee";

interface AttendanceFormProps {
  onAddAttendance: (attendance: Attendance) => void;
}

interface AttendanceFormValues {
  employeeId: string;
  employeeName: string;
  date: dayjs.Dayjs;
  status: Attendance["status"];
  timeIn?: dayjs.Dayjs;
  timeOut?: dayjs.Dayjs;
}

function AttendanceForm({
  onAddAttendance,
}: AttendanceFormProps) {
  const [form] = Form.useForm();

  const handleSubmit = (values: AttendanceFormValues) => {
    const newAttendance: Attendance = {
      id: Date.now(),
      employeeId: values.employeeId,
      employeeName: values.employeeName,
      date: values.date.format("YYYY-MM-DD"),
      timeIn: values.timeIn
        ? values.timeIn.format("hh:mm A")
        : "-",
      timeOut: values.timeOut
        ? values.timeOut.format("hh:mm A")
        : "-",
      status: values.status,
    };

    onAddAttendance(newAttendance);

    form.resetFields();

    form.setFieldsValue({
      date: dayjs(),
      status: "Present",
    });
  };

  return (
    <Card
      title="Add Attendance Record"
      style={{ marginBottom: 24 }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          date: dayjs(),
          status: "Present",
        }}
      >
        <div className="attendance-form-grid">
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
              placeholder="Example: EMP001"
            />
          </Form.Item>

          <Form.Item
            label="Employee Name"
            name="employeeName"
            rules={[
              {
                required: true,
                message: "Please enter employee name",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter employee name"
            />
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[
              {
                required: true,
                message: "Please select date",
              },
            ]}
          >
            <DatePicker
              size="large"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[
              {
                required: true,
                message: "Please select status",
              },
            ]}
          >
            <Select
              size="large"
              options={ATTENDANCE_STATUS_OPTIONS}
            />
          </Form.Item>

          <Form.Item
            label="Time In"
            name="timeIn"
          >
            <TimePicker
              size="large"
              use12Hours
              format="hh:mm A"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Time Out"
            name="timeOut"
          >
            <TimePicker
              size="large"
              use12Hours
              format="hh:mm A"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </div>

        <Button
          type="primary"
          htmlType="submit"
          icon={<PlusOutlined />}
          size="large"
        >
          Add Attendance
        </Button>
      </Form>
    </Card>
  );
}

export default AttendanceForm;