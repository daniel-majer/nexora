import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/apiLogin";

export const useLogin = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: { email: string; password: string }) => login(data),
  });
  return { mutate, isPending };
};
