import { useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../auth/api/apiClient";

function useGetAllSpecialties() {
  const queryClient = useQueryClient();

  const {
    data: specialties = [],
    isLoading: loadingSpecialties,
    isError: errorSpecialties,
  } = useQuery({
    queryKey: ["specialties"],
    queryFn: () => apiClient.get("/specialty").then((r) => r.data),
  });

  const setSpecialties = (updater) =>
    queryClient.setQueryData(["specialties"], updater);

  return { specialties, loadingSpecialties, errorSpecialties, setSpecialties };
}

export default useGetAllSpecialties;
