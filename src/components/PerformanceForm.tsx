import { useState } from "react";
import {
  Alert,
  Button,
  Form,
  InputNumber,
  Select,
  Space,
  Spin,
  Typography,
} from "antd";
import {
  ClearOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import {
  PERFORMANCE_WEIGHTS,
  PERFORMANCE_WEIGHT_LABEL,
  SCORE_CRITERIA_LABELS,
  getRating,
} from "../constants";

import type {
  Employee,
  Performance,
} from "../types/employee";

const { Text } = Typography;

interface PerformanceFormProps {
  employees: Employee[];
  onAddPerformance: (performance: Performance) => void;
}

interface PerformanceFormValues {
  employeeId: string;
  quality: number;
  productivity: number;
  teamwork: number;
  communication: number;
}

const SCORE_FIELDS = [
  "quality",
  "productivity",
  "teamwork",
  "communication",
] as const;

function PerformanceForm({
  employees,
  onAddPerformance,
}: PerformanceFormProps) {
  const [form] = Form.useForm<PerformanceFormValues>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values: PerformanceFormValues) => {
    const employee = employees.find(
      (item) => item.employeeId === values.employeeId
    );

    if (!employee) {
      return;
    }

    const overallScore =
      values.quality * PERFORMANCE_WEIGHTS.quality +
      values.productivity * PERFORMANCE_WEIGHTS.productivity +
      values.teamwork * PERFORMANCE_WEIGHTS.teamwork +
      values.communication * PERFORMANCE_WEIGHTS.communication;

    const newPerformance: Performance = {
      id: Date.now(),
      employeeId: employee.employeeId,
      employeeName: employee.name,
      quality: values.quality,
      productivity: values.productivity,
      teamwork: values.teamwork,
      communication: values.communication,
      overallScore: Number(overallScore.toFixed(2)),
      rating: getRating(overallScore),
    };

    setLoading(true);

    setTimeout(() => {
      onAddPerformance(newPerformance);
      form.resetFields();
      setLoading(false);
    }, 800);
  };

  const handleClear = () => {
    form.resetFields();
  };

  return (
    <Spin spinning={loading} tip="Saving evaluation...">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        {employees.length === 0 && (
          <Alert
            type="warning"
            showIcon
            message="No employees available"
            description="Please add an employee before creating a performance evaluation."
            style={{ marginBottom: 24 }}
          />
        )}

        <Form.Item
          label="Employee"
          name="employeeId"
          rules={[
            {
              required: true,
              message: "Please select an employee.",
            },
          ]}
        >
          <Select
            size="large"
            showSearch
            optionFilterProp="label"
            placeholder="Select employee"
            disabled={employees.length === 0 || loading}
            options={employees.map((employee) => ({
              value: employee.employeeId,
              label: `${employee.employeeId} - ${employee.name}`,
            }))}
          />
        </Form.Item>

        <div className="performance-score-grid">
          {SCORE_FIELDS.map((field) => (
            <Form.Item
              key={field}
              label={SCORE_CRITERIA_LABELS[field]}
              name={field}
              rules={[
                {
                  required: true,
                  message: `Enter ${SCORE_CRITERIA_LABELS[field].toLowerCase()} score.`,
                },
              ]}
            >
              <InputNumber
                min={0}
                max={100}
                precision={0}
                size="large"
                style={{ width: "100%" }}
                placeholder="0 - 100"
                disabled={loading}
                addonAfter="%"
              />
            </Form.Item>
          ))}
        </div>

        <Space>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            size="large"
            loading={loading}
            disabled={employees.length === 0}
          >
            Save Evaluation
          </Button>

          <Button
            type="default"
            icon={<ClearOutlined />}
            size="large"
            onClick={handleClear}
            disabled={loading}
          >
            Clear
          </Button>
        </Space>

        <div style={{ marginTop: 16 }}>
          <Text type="secondary">{PERFORMANCE_WEIGHT_LABEL}</Text>
        </div>
      </Form>
    </Spin>
  );
}

export default PerformanceForm;