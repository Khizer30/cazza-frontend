import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getToken } from "@/utils/localStorage";
import { useUserStore } from "@/store/userStore";
import { useUser } from "@/hooks/useUser";

const PrivateRoute = () => {
  const location = useLocation();
  const token = getToken();
  const { user } = useUserStore();
  const { fetchUserProfile } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      if (token) {
        const currentUser = useUserStore.getState().user;
        if (!currentUser) {
          // Fetch user profile if not in store
          await fetchUserProfile();
        }
      }
      setIsLoading(false);
    };

    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Check if user needs onboarding (except if already on onboarding page)
  if (location.pathname !== "/onboarding" && user && !user.businessProfile) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;