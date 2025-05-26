import React from "react";
import { useUser } from "./useUser";
import { Spinner } from "../../ui/Spinner";
import { useNavigate } from "react-router";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />;
      </div>
    );

  if (isAuthenticated) return <div>{children}</div>;
};
