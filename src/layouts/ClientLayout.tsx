import { useState } from "react";
import { Outlet } from "react-router-dom";

import { NavBar } from "@/components/ClientComponents/NavBar";
import { Header } from "@/components/Header";

export const ClientLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="h-screen flex flex-col bg-sidebar-accent overflow-hidden">
      <Header onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1 min-h-0">
        <div className="hidden lg:block h-full">
          <NavBar />
        </div>

        <div
          className={`lg:hidden fixed inset-y-0 left-0 z-50 bg-card border-r border-border transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <NavBar onNavigate={toggleSidebar} />
        </div>

        {isSidebarOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={toggleSidebar} />}

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
