"use server";

import { supabase } from "@/lib/supabase";

export async function addMemory(content: string) {
  const { data, error } = await supabase
    .from("memories")
    .insert([
      {
        content,
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function deleteMemory(id: number) {
  const { error } = await supabase
    .from("memories")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
export async function updateMemory(id: number, content: string) {
  const { error } = await supabase
    .from("memories")
    .update({
      content,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function searchMemory(keyword: string) {
  const { data, error } = await supabase
    .from("memories")
    .select("*")
    .ilike("content", `%${keyword}%`)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
