import { useState } from "react";
import {
  AppstoreOutlined,
  TeamOutlined,
  FieldTimeOutlined,
  LineChartOutlined,
  FileTextOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Menu, type MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import BrandMark from "./BrandMark";

const MENU_ITEMS: MenuProps["items"] = [
  {
    key: "/",
    icon: <AppstoreOutlined />,
    label: "Dashboard",
  },
  {
    key: "/employees",
    icon: <TeamOutlined />,
    label: "Employees",
  },
  {
    key: "/attendance",
    icon: <FieldTimeOutlined />,
    label: "Attendance",
  },
  {
    key: "/performance",
    icon: <LineChartOutlined />,
    label: "Performance",
  },
  {
    key: "/reports",
    icon: <FileTextOutlined />,
    label: "Reports",
  },
];

interface SidebarProps {
  onNavigate?: () => void;
  variant?: "side" | "drawer";
}

function Sidebar({
  onNavigate,
  variant = "side",
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isCollapsed = variant === "drawer" ? false : collapsed;

  const selectedKey = MENU_ITEMS?.some(
    (item) => item && item.key === location.pathname
  )
    ? location.pathname
    : "/";

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    navigate(String(key));
    onNavigate?.();
  };

  return (
    <div
      className={`sidebar-wrapper ${
        isCollapsed ? "sidebar-collapsed" : ""
      }`}
    >
      <div className="sidebar-brand">
        <div className="brand-icon">
          <BrandMark />
        </div>

        {!isCollapsed && (
          <div className="brand-text">
            <div className="brand-title">EmployEase</div>
            <div className="brand-subtitle">Personnel Evaluation</div>
          </div>
        )}

        {variant === "side" && (
          <Button
            type="text"
            icon={
              isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
            }
            onClick={() => setCollapsed((prev) => !prev)}
            aria-label={isCollapsed ? "Show sidebar" : "Hide sidebar"}
          />
        )}
      </div>

      {!isCollapsed && (
        <div className="sidebar-section-title">MAIN MENU</div>
      )}

      <Menu
        mode="inline"
        inlineCollapsed={isCollapsed}
        selectedKeys={[String(selectedKey)]}
        onClick={handleMenuClick}
        items={MENU_ITEMS}
      />

      {!isCollapsed && (
        <div className="sidebar-bottom">
          <div className="sidebar-status">
            <span className="status-dot" />
            <div>
              <strong>System Online</strong>
              <small>All services running</small>
            </div>
          </div>

          <div className="sidebar-version">EmployEase v1.0</div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;