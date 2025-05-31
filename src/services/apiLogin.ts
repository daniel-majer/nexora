import supabase from "./supabase";

export async function login(data: { email: string; password: string }) {
  let { data: credentials, error } =
    await supabase.auth.signInWithPassword(data);

  if (error) throw new Error("Something went wrong!");

  return credentials;
}

export async function getUser() {
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError || !session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error("Could not authenticate");

  return data.user;
}

export async function logOut() {
  let { error } = await supabase.auth.signOut();
  if (error) throw new Error("Something went wrong!");
}
