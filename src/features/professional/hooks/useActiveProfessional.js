import { useQuery } from "@tanstack/react-query";
import apiClient from "../../auth/api/apiClient";
import { useAuth } from "../../auth/hooks/useAuth";

/**
 * Fetches the full active-user object (with nested professional data).
 * Shares the ["active-user"] React Query cache with OptionsModal so there
 * is only one network request regardless of how many consumers exist.
 */
function useActiveProfessional() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["active-user"],
    queryFn: () => apiClient.get("/auth/active-user").then((r) => r.data),
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });

  return {
    professionalId: data?.professional?.professionalId ?? null,
    activeUser: data,
    isLoading,
  };
}

export default useActiveProfessional;
