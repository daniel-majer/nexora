import type { SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import supabase from "./supabase";
import type { UpdateProps } from "../features/login/useUpdateData";

export async function createUser(dataForm: SignUpWithPasswordCredentials) {
  let { data, error } = await supabase.auth.signUp(dataForm);

  if (error) throw new Error("Could not create user");

  return data;
}

export async function updateUser({ formData, imgFile, imgName }: UpdateProps) {
  const { data, error } = await supabase.auth.updateUser(formData);

  if (error) throw new Error(error.message);

  if (!imgFile || !imgName) return;

  if (!imgFile[0]) return data;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(imgName, imgFile[0], {
      cacheControl: "3600",
      upsert: false,
    });

  if (storageError) throw new Error("Image could not be created");
  
  return data;
}
