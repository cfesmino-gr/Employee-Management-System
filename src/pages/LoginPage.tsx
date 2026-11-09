import { Form, Input, Button, Card, Typography, App } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import BrandMark from "../components/BrandMark";
import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();
  const { message } = App.useApp();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = (values: { username: string; password: string }) => {
    if (values.username === "admin" && values.password === "admin123") {
      message.success("Login successful!");
      login();
      navigate("/", { replace: true });
      return;
    }

    message.error("Invalid username or password!");
  };

  return (
    <div className="login-page">
      <Card className="login-card">
        <div className="login-logo">
          <BrandMark />
        </div>

        <Typography.Title
          level={2}
          style={{ textAlign: "center", marginBottom: 4 }}
        >
          EmployEase
        </Typography.Title>

        <p className="login-description">Administrator Login</p>

        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter your username",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Enter username"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Enter password"
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" size="large" block>
            Login
          </Button>
        </Form>

        <div className="login-footer">EmployEase v1.0</div>
      </Card>
    </div>
  );
}

export default LoginPage;