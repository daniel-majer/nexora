import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../services/apiSignup";
import type { SignUpWithPasswordCredentials } from "@supabase/supabase-js";

export const useCreateUser = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignUpWithPasswordCredentials) => createUser(data),
  });
  return { mutate, isPending };
};
