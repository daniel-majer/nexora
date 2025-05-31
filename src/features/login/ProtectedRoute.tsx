import React from "react";
import { useUser } from "./useUser";
import { Spinner } from "../../ui/Spinner";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  React.useEffect(() => {
    if (user === null) queryClient.removeQueries();

    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate, queryClient]);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );

  if (isAuthenticated) return <div>{children}</div>;
};
