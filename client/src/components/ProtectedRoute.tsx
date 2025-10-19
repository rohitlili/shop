import { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "admin";
}

export function ProtectedRoute({
  children,
  requiredRole = "admin",
}: ProtectedRouteProps) {
  const [, setLocation] = useLocation();
  
  const { data: currentUser, isLoading, error } = useQuery({
    queryKey: ["/api/auth/me"],
    queryFn: async () => {
      const sessionId = localStorage.getItem("sessionId");
      if (!sessionId) {
        throw new Error("Not authenticated");
      }

      const response = await fetch("/api/auth/me", {
        headers: {
          "x-session-id": sessionId,
        },
      });

      if (!response.ok) {
        throw new Error("Not authenticated");
      }

      return response.json();
    },
    retry: false,
    refetchInterval: false,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Access Denied</h2>
              <p className="text-muted-foreground">
                You don't have permission to access this page.
              </p>
              <Button
                onClick={() => setLocation("/")}
                className="w-full"
              >
                Go Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (requiredRole === "admin" && !currentUser.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Unauthorized</h2>
              <p className="text-muted-foreground">
                Only administrators can access this page.
              </p>
              <Button onClick={() => setLocation("/")} className="w-full">
                Go Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
