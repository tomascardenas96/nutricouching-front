import { useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../auth/api/apiClient";

function useGetAllViands() {
  const queryClient = useQueryClient();

  const {
    data: viands = [],
    isLoading: viandsLoading,
    isError: viandsError,
  } = useQuery({
    queryKey: ["viands"],
    queryFn: () => apiClient.get("/viand").then((r) => r.data),
  });

  const setViands = (updater) => queryClient.setQueryData(["viands"], updater);

  return { viands, viandsLoading, viandsError, setViands };
}

export default useGetAllViands;
