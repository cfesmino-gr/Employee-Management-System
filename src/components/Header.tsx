import {
  BellOutlined,
  UserOutlined,
  CheckOutlined,
  LogoutOutlined,
  MenuOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";

import {
  Badge,
  Button,
  Empty,
  List,
  Modal,
  Popover,
  Typography,
} from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import { useTheme } from "../contexts/ThemeContext";
import type { NotificationItem } from "../types/notification";

interface HeaderProps {
  pageTitle: string;
  onOpenSidebar: () => void;
}

function Header({ pageTitle, onOpenSidebar }: HeaderProps) {
  const { logout } = useAuth();
  const { mode, toggleMode } = useTheme();
  const {
    notifications,
    markAllNotificationsRead,
    markNotificationRead,
  } = useData();
  const navigate = useNavigate();
  const [selectedNotification, setSelectedNotification] =
    useState<NotificationItem | null>(null);

  const unreadCount = notifications.filter((item) => !item.read).length;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleOpenNotification = (item: NotificationItem) => {
    markNotificationRead(item.id);
    setSelectedNotification({ ...item, read: true });
  };

  const notificationContent = (
    <div className="notification-panel">
      <div className="notification-header">
        <div>
          <Typography.Text strong>Notifications</Typography.Text>
          <div className="notification-count">
            {unreadCount > 0
              ? `${unreadCount} unread notification${
                  unreadCount > 1 ? "s" : ""
                }`
              : "No unread notifications"}
          </div>
        </div>

        {unreadCount > 0 && (
          <Button
            type="link"
            size="small"
            icon={<CheckOutlined />}
            onClick={markAllNotificationsRead}
          >
            Mark all read
          </Button>
        )}
      </div>

      <div className="notification-list">
        {notifications.length > 0 ? (
          <List
            dataSource={notifications}
            renderItem={(item) => (
              <List.Item
                className={
                  item.read
                    ? "notification-item"
                    : "notification-item unread"
                }
                role="button"
                tabIndex={0}
                onClick={() => handleOpenNotification(item)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleOpenNotification(item);
                  }
                }}
              >
                <div className="notification-item-content">
                  <div className="notification-item-top">
                    <strong>{item.title}</strong>
                    {!item.read && (
                      <span className="notification-unread-dot" />
                    )}
                  </div>
                  <div className="notification-description">
                    {item.description}
                  </div>
                  <div className="notification-time">{item.time}</div>
                </div>
              </List.Item>
            )}
          />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No notifications"
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="header-content">
      <div className="header-left">
        <Button
          type="text"
          icon={<MenuOutlined />}
          className="header-menu-toggle"
          onClick={onOpenSidebar}
          aria-label="Open navigation menu"
        />
        <div>
          <div className="header-page-title">{pageTitle}</div>
          <div className="header-date">Employee Management Dashboard</div>
        </div>
      </div>

      <div className="header-right">
        <Popover
          content={notificationContent}
          trigger="click"
          placement="bottomRight"
          overlayClassName="notification-popover"
        >
          <button type="button" className="header-icon-button">
            <Badge count={unreadCount} size="small" offset={[-2, 2]}>
              <BellOutlined />
            </Badge>
          </button>
        </Popover>

        <div className="header-divider" />

        <div className="profile-area">
          <div className="profile-avatar">
            <UserOutlined />
          </div>

          <div className="profile-info">
            <strong>Administrator</strong>
            <span>System Admin</span>
          </div>

          <Button
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Button>

          <button
            type="button"
            className="header-icon-button"
            onClick={toggleMode}
            aria-label={
              mode === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            title={
              mode === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            {mode === "dark" ? <SunOutlined /> : <MoonOutlined />}
          </button>
        </div>
      </div>

      <Modal
        open={selectedNotification !== null}
        onCancel={() => setSelectedNotification(null)}
        footer={null}
        title="Notification Details"
        centered
        className="notification-detail-modal"
      >
        {selectedNotification && (
          <div className="notification-detail">
            <div className="notification-detail-title">
              {selectedNotification.title}
            </div>
            <p className="notification-detail-description">
              {selectedNotification.description}
            </p>
            <div className="notification-detail-time">
              {selectedNotification.time}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Header;