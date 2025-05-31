import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../services/apiSignup";
import type { UserAttributes } from "@supabase/supabase-js";

export type UpdateProps = {
  formData: UserAttributes;
  imgFile?: FileList;
  imgName?: string;
};

export const useUpdateData = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ formData, imgFile, imgName }: UpdateProps) =>
      updateUser({ formData, imgFile, imgName }),
  });

  return { mutate, isPending };
};
