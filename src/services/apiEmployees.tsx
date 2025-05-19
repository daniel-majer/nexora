import { useQuery } from "@tanstack/react-query";
import type { Employees } from "../types/types";
import supabase from "./supabase";

async function getEmployees() {
  const { data: employees, error } = await supabase
    .from("employees")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw new Error("Orders could not be loaded");

  return employees as Employees[];
}

export function useEmployees() {
  return useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });
}
