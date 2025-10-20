import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResetPassword } from "./pages/auth/ResetPassword";
import { SetNewPassword } from "./pages/auth/SetNewPassword";
import { SignIn } from "./pages/auth/SignIn";
import { SignUp } from "./pages/auth/SignUp";
import NotFound from "./pages/NotFound";
import { LandingPage } from "./pages/landingPage/LandingPage";
import { ThemeProvider } from "./components/theme-provider";
import { ClientLayout } from "./layouts/ClientLayout";
import { ClientDashboard } from "./pages/ClientDashboard/ClientDashboard";

const App = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/set-new-password" element={<SetNewPassword />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/client" element={<ClientLayout />}>
              <Route index element={<ClientDashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
