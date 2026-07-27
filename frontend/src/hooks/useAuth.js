import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";

const checkAuthStatus = async () => {
  const { data } = await api.get("/login/auth/check", {
    withCredentials: true,
  });
  return data;
};

export function useAuth() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthStatus,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post("/login/user/logout", {}, { withCredentials: true });
    },
    onSuccess: () => {
      queryClient.setQueryData(["authUser"], null);
      navigate("/");
    },
  });

  return {
    isLoggedIn: !!data && !isError,
    user: data?.user || null,
    isLoading,
    logout: logoutMutation.mutate,
  };
}
