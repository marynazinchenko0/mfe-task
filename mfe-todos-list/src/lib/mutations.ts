import supabase from "./supabaseClient.ts";

export function completeTask(id: number) {
  return supabase.from('todos').update({completed: true}).eq('id', id);
}

export function deleteTask(
  id: number
) {
  return supabase.from('todos').delete().eq('id', id);
}