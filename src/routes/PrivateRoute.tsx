import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useUser } from "@/hooks/useUser";

const PrivateRoute = () => {
  const location = useLocation();
  const { user } = useUserStore();
  const { fetchUserProfile } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      // Try to fetch user profile (cookies will be sent automatically)
      const currentUser = useUserStore.getState().user;
      if (!currentUser) {
        await fetchUserProfile();
      }
      setAuthChecked(true);
      setIsLoading(false);
    };

    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // After checking, if no user found, redirect to login
  if (authChecked && !user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user needs onboarding (except if already on onboarding page)
  // Only OWNER role users need onboarding, skip for other roles
  if (
    location.pathname !== "/onboarding" &&
    user &&
    !user.businessProfile &&
    user.role === "OWNER"
  ) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
