import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { App as AntdApp, ConfigProvider, theme } from "antd";

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import AppLayout from "./components/AppLayout";
import PostLoginLoader from "./components/PostLoginLoader";

import LoginPage from "./pages/LoginPage";

const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const EmployeesPage = lazy(() => import("./pages/EmployeesPage"));
const AttendancePage = lazy(() => import("./pages/AttendancePage"));
const PerformancePage = lazy(() => import("./pages/PerformancePage"));
const ReportPage = lazy(() => import("./pages/ReportPage"));

const FONT_FAMILY =
  "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

const darkTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: "#18C078",
    colorInfo: "#18C078",
    colorSuccess: "#18C078",
    colorError: "#F05A54",
    colorWarning: "#F0D878",
    colorBgBase: "#242729",
    colorTextBase: "#F1F2F3",
    borderRadius: 10,
    fontFamily: FONT_FAMILY,
  },
  components: {
    Card: { colorBgContainer: "#313539" },
    Table: {
      headerBg: "#262A2D",
      headerColor: "#A8AFB6",
      rowHoverBg: "rgba(24, 192, 120, 0.07)",
    },
    Menu: { darkItemBg: "transparent" },
  },
};

const lightTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: "#0EA36B",
    colorInfo: "#0EA36B",
    colorSuccess: "#10A867",
    colorError: "#E5484D",
    colorWarning: "#D99E1E",
    borderRadius: 10,
    fontFamily: FONT_FAMILY,
  },
  components: {
    Card: { colorBgContainer: "#FFFFFF" },
    Table: {
      headerBg: "#F1F4F9",
      headerColor: "#52647A",
      rowHoverBg: "rgba(14, 163, 107, 0.06)",
    },
    Menu: { darkItemBg: "transparent" },
  },
};

function ProtectedLayout() {
  const { isLoggedIn } = useAuth();
  const [showLoader, setShowLoader] = useState<boolean>(() => isLoggedIn);
  const [loaderExiting, setLoaderExiting] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    const exitTimer = window.setTimeout(() => {
      setLoaderExiting(true);
    }, 1450);
    const hideTimer = window.setTimeout(() => {
      setShowLoader(false);
    }, 1750);
    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (showLoader) {
    return <PostLoginLoader exiting={loaderExiting} />;
  }

  return <AppLayout />;
}

function ThemedApp() {
  const { mode } = useTheme();

  return (
    <ConfigProvider theme={mode === "dark" ? darkTheme : lightTheme}>
      <AntdApp>
        <AuthProvider>
          <DataProvider>
            <BrowserRouter>
              <Suspense fallback={null}>
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route element={<ProtectedLayout />}>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/employees" element={<EmployeesPage />} />
                    <Route path="/attendance" element={<AttendancePage />} />
                    <Route path="/performance" element={<PerformancePage />} />
                    <Route path="/reports" element={<ReportPage />} />
                  </Route>
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </DataProvider>
        </AuthProvider>
      </AntdApp>
    </ConfigProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

export default App;
