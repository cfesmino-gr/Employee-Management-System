import { useState } from "react";
import { Drawer } from "antd";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

const PAGE_TITLES: Record<string, string> = {
  "/": "Dashboard",
  "/employees": "Employees",
  "/attendance": "Attendance",
  "/performance": "Performance",
  "/reports": "Reports",
};

function AppLayout() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const pageTitle = PAGE_TITLES[location.pathname] ?? "Dashboard";

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <div className="app-layout">
      <Sidebar onNavigate={closeDrawer} />

      <div className="main-layout">
        <Header
          pageTitle={pageTitle}
          onOpenSidebar={() => setDrawerOpen(true)}
        />
        <main className="content-area">
          <Outlet />
        </main>
      </div>

      <Drawer
        placement="left"
        width={260}
        open={drawerOpen}
        onClose={closeDrawer}
        closable={false}
        className="mobile-nav-drawer"
        styles={{ body: { padding: 0 } }}
      >
        <Sidebar onNavigate={closeDrawer} variant="drawer" />
      </Drawer>
    </div>
  );
}

export default AppLayout;