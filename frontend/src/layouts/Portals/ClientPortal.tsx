import { NavBar } from "@/components/ClientComponents/NavBar";
import { Header } from "@/components/Header";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AIChat } from "../../pages/AIChat";
import { ClientDashboard } from "@/pages/ClientDashboard/ClientDashboard";

export const ClientPortal = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="min-h-screen flex flex-col bg-black/5">
      <Header onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar - Always visible on large screens */}
        <div className="hidden lg:block">
          <NavBar />
        </div>

        {/* Mobile Sidebar - Overlay on small screens */}
        <div
          className={`lg:hidden fixed inset-y-0 left-0 z-50 bg-card border-r border-border transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <NavBar onNavigate={toggleSidebar} />
        </div>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={toggleSidebar}
          />
        )}

        <div className="flex-1 overflow-hidden">
          <Routes>
            <Route
              path="dashboard"
              element={
                // <DateRangeProvider>
                <ClientDashboard />
                // </DateRangeProvider>
              }
            />
            {/* <Route path="/chat" element={<AIChat />} /> */}
            {/* <Route path="/chat/:accountantId" element={<ClientDirectChat />} />
            <Route path="/realtime" element={<RealtimeDashboardWidget />} />
            <Route path="/communication" element={<CommunicationSection />} />
            <Route path="/channels" element={<ClientChannels />} />
            <Route path="/team" element={<ClientTeamManagement />} />
            <Route path="/documents" element={<ClientDocuments />} />
            <Route path="/tasks" element={<ClientTasks />} />
            <Route path="/reports" element={<ClientReports />} />
            <Route path="/platforms" element={<PlatformsSection />} />
            <Route path="/ai-chat" element={<AIChat />} />
            <Route path="/ai-channel/:channelId" element={<ChannelView />} />
            <Route path="/channel/:channelId" element={<ChannelView />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
};
