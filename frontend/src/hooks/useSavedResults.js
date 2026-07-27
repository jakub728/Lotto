import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";

const fetchSaved = async () => {
  const { data } = await api.get("/saved/user/savedNumbers");
  return data;
};

export function useSavedResults() {
  return useQuery({
    queryKey: ["saved"],
    queryFn: fetchSaved,
    refetchInterval: 10 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
  });
}
