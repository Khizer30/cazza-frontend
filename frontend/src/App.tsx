import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResetPassword } from "./pages/auth/ResetPassword";
import { SetNewPassword } from "./pages/auth/SetNewPassword";
import { SignIn } from "./pages/auth/SignIn";
import { SignUp } from "./pages/auth/SignUp";
import { DataProtection } from "./pages/auth/Term and Conditions/DataProtection";
import NotFound from "./pages/NotFound";
import { LandingPage } from "./pages/landingPage/LandingPage";
import { AmazonSellers } from "./pages/landingPage/AmazonSellers";
import { ThemeProvider } from "./components/theme-provider";
import { ClientLayout } from "./layouts/ClientLayout";
import { ClientDashboard } from "./pages/ClientDashboard/ClientDashboard";
import { ClientPlatforms } from "./pages/ClientDashboard/ClientPlatforms";
import { AIChat } from "./pages/ClientDashboard/AIChat";
import { Channels } from "./pages/ClientDashboard/Channels";
import { BillingSettings } from "./pages/Settings/BillingSettings";
import { SupportSettings } from "./pages/Settings/SupportSettings";
import { AccountSettings } from "./pages/Settings/AccountSettings";
import { TeamSettings } from "./pages/Settings/TeamSettings";
import { Onboarding } from "./pages/auth/OnBoarding";
import { PrivacyPolicy } from "./pages/auth/Term and Conditions/PrivacyPolicy";
import { TermsAndConditions } from "./pages/auth/Term and Conditions/TermsAndConditions";
import { CookiePolicy } from "./pages/auth/Term and Conditions/CookiePolicy";
import { Disclaimer } from "./pages/auth/Term and Conditions/Disclaimer";
import { ToastProvider } from "@radix-ui/react-toast";

const App = () => {
  return (
    <ToastProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route index element={<LandingPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/data-protection" element={<DataProtection />} />
            <Route path="/amazon-sellers" element={<AmazonSellers />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/set-new-password" element={<SetNewPassword />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/client" element={<ClientLayout />}>
              <Route index element={<ClientDashboard />} />
              <Route path="platforms" element={<ClientPlatforms />} />
              <Route path="channels" element={<Channels />} />
              <Route path="ask-cazza" element={<AIChat />} />
              <Route path="billing" element={<BillingSettings />} />
              <Route path="support" element={<SupportSettings />} />
              <Route path="settings" element={<AccountSettings />} />
              <Route path="teams" element={<TeamSettings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ToastProvider>
  );
};

export default App;
