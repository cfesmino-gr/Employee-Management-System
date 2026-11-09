import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { App } from "antd";

import type {
  Employee,
  Attendance,
  Performance,
} from "../types/employee";
import type { NotificationItem } from "../types/notification";

interface DataContextValue {
  employees: Employee[];
  attendance: Attendance[];
  performances: Performance[];
  notifications: NotificationItem[];
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  averagePerformance: number;
  addEmployee: (employee: Employee) => void;
  deleteEmployee: (id: number) => void;
  addAttendance: (record: Attendance) => void;
  deleteAttendance: (id: number) => void;
  addPerformance: (performance: Performance) => void;
  clearPerformances: () => void;
  markAllNotificationsRead: () => void;
  markNotificationRead: (id: number) => void;
}

interface DataProviderProps {
  children: ReactNode;
}

const DEFAULT_NOTIFICATION: NotificationItem = {
  id: 1,
  title: "System Online",
    description: "EmployEase is running.",
  time: "Just now",
  read: false,
};

const DataContext = createContext<DataContextValue | null>(null);

function readLocalStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeLocalStorage(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

function DataProvider({ children }: DataProviderProps) {
  const { message } = App.useApp();
  const [employees, setEmployees] = useState<Employee[]>(() =>
    readLocalStorage<Employee[]>("employees", [])
  );
  const [attendance, setAttendance] = useState<Attendance[]>(() =>
    readLocalStorage<Attendance[]>("attendance", [])
  );
  const [performances, setPerformances] = useState<Performance[]>(() =>
    readLocalStorage<Performance[]>("performances", [])
  );
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    () =>
      readLocalStorage<NotificationItem[]>("notifications", [
        DEFAULT_NOTIFICATION,
      ])
  );

  useEffect(() => {
    writeLocalStorage("employees", employees);
  }, [employees]);

  useEffect(() => {
    writeLocalStorage("attendance", attendance);
  }, [attendance]);

  useEffect(() => {
    writeLocalStorage("performances", performances);
  }, [performances]);

  useEffect(() => {
    writeLocalStorage("notifications", notifications);
  }, [notifications]);

  const addEmployee = useCallback((employee: Employee) => {
    setEmployees((prev) => [...prev, employee]);
    setNotifications((prev) => [
      {
        id: Date.now(),
        title: "New Employee",
        description: `${employee.name} was added to the employee list.`,
        time: "Just now",
        read: false,
      },
      ...prev,
    ]);
    message.success("Employee added successfully!");
  }, [message]);

  const deleteEmployee = useCallback((id: number) => {
    const target = employees.find((item) => item.id === id);
    setEmployees((prev) => prev.filter((item) => item.id !== id));
    if (target) {
      setNotifications((prev) => [
        {
          id: Date.now(),
          title: "Employee Deleted",
          description: `${target.name} was removed from the employee list.`,
          time: "Just now",
          read: false,
        },
        ...prev,
      ]);
    }
    message.success("Employee deleted successfully!");
  }, [employees, message]);

  const addAttendance = useCallback((record: Attendance) => {
    setAttendance((prev) => [...prev, record]);
    setNotifications((prev) => [
      {
        id: Date.now(),
        title: "Attendance Record",
        description: `Attendance record added for ${record.employeeName}.`,
        time: "Just now",
        read: false,
      },
      ...prev,
    ]);
    message.success("Attendance record added successfully!");
  }, [message]);

  const deleteAttendance = useCallback((id: number) => {
    setAttendance((prev) => prev.filter((item) => item.id !== id));
    message.success("Attendance record deleted successfully!");
  }, [message]);

  const addPerformance = useCallback((performance: Performance) => {
    setPerformances((prev) => [...prev, performance]);
    setNotifications((prev) => [
      {
        id: Date.now(),
        title: "Performance Evaluation",
        description: `Performance evaluation added for ${performance.employeeName}.`,
        time: "Just now",
        read: false,
      },
      ...prev,
    ]);
    message.success("Performance saved successfully!");
  }, [message]);

  const clearPerformances = useCallback(() => {
    setPerformances([]);
    setNotifications((prev) => [
      {
        id: Date.now(),
        title: "Performance Records Cleared",
        description: "All performance records were cleared.",
        time: "Just now",
        read: false,
      },
      ...prev,
    ]);
    message.success("All performance records cleared.");
  }, [message]);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, read: true }))
    );
    message.success("All notifications marked as read.");
  }, [message]);

  const markNotificationRead = useCallback((id: number) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  }, []);

  const totalEmployees = employees.length;
  const presentToday = attendance.filter(
    (item) => item.status === "Present"
  ).length;
  const absentToday = attendance.filter(
    (item) => item.status === "Absent"
  ).length;
  const averagePerformance =
    performances.length > 0
      ? performances.reduce(
          (total, item) => total + Number(item.overallScore || 0),
          0
        ) / performances.length
      : 0;

  const value = useMemo(
    () => ({
      employees,
      attendance,
      performances,
      notifications,
      totalEmployees,
      presentToday,
      absentToday,
      averagePerformance,
      addEmployee,
      deleteEmployee,
      addAttendance,
      deleteAttendance,
      addPerformance,
      clearPerformances,
      markAllNotificationsRead,
      markNotificationRead,
    }),
    [
      employees,
      attendance,
      performances,
      notifications,
      totalEmployees,
      presentToday,
      absentToday,
      averagePerformance,
      addEmployee,
      deleteEmployee,
      addAttendance,
      deleteAttendance,
      addPerformance,
      clearPerformances,
      markAllNotificationsRead,
      markNotificationRead,
    ]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

function useData(): DataContextValue {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}

export { DataProvider, useData };