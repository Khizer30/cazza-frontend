import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useUser } from "@/hooks/useUser";
import { useUserStore } from "@/store/userStore";

const PublicRoute = () => {
  const { user } = useUserStore();
  const { checkLoggedIn } = useUser();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const checkSession = async () => {
      await checkLoggedIn();
      if (!cancelled) {
        setChecked(true);
      }
    };
    checkSession();
    return () => {
      cancelled = true;
    };
  }, [checkLoggedIn]);

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
export default PublicRoute;
