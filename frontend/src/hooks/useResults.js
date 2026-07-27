import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";

const fetchResuts = async () => {
  const { data } = await api.get("/results");
  return data;
};

export function useResults() {
  return useQuery({
    queryKey: ["results"],
    queryFn: fetchResuts,
    refetchInterval: 10 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
  });
}
