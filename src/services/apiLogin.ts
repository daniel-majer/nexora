import supabase from "./supabase";

export async function login(data: { email: string; password: string }) {
  let { data: credentials, error } =
    await supabase.auth.signInWithPassword(data);

  if (error) throw new Error("Something went wrong!");

  return credentials;
}

export async function logOut() {
  let { error } = await supabase.auth.signOut();
  if (error) throw new Error("Something went wrong!");
}

export async function getUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error("Could not authenticated");

  return data.user;
}
