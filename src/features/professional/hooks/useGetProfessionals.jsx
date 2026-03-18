import { useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../auth/api/apiClient";

function useGetProfessionals() {
  const queryClient = useQueryClient();

  const {
    data: professionals = [],
    isLoading: professionalsLoading,
    isError: professionalsError,
  } = useQuery({
    queryKey: ["professionals"],
    queryFn: () => apiClient.get("/professional").then((r) => r.data),
  });

  const setProfessionals = (updater) =>
    queryClient.setQueryData(["professionals"], updater);

  return {
    professionals,
    professionalsLoading,
    professionalsError,
    setProfessionals,
  };
}

export default useGetProfessionals;
