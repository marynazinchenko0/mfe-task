import supabase from "./supabaseClient.ts";
import type { Task } from "../types";

export function createTask(
  {title, priority, description, deadline}: Omit<Task, "id" | "completed" | "created_at">
) {
  return supabase.from('todos').insert({
    title,
    priority,
    deadline,
    description,
    completed: false,
  });
}

export function updateTask(
  {id, title, priority, description, deadline}: Omit<Task, "completed" | "created_at">
) {
  return supabase.from('todos').update({
    title,
    priority,
    deadline,
    description,
  }).eq('id', id);
}