import type { SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import supabase from "./supabase";

export async function createUser(dataForm: SignUpWithPasswordCredentials) {
  let { data, error } = await supabase.auth.signUp(dataForm);

  if (error) throw new Error("Could not create user");

  return data;
}
