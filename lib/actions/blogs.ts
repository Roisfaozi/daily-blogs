"use server";

import { BlogFormSchemaType } from "@/app/dashboard/schema";
import { revalidatePath } from "next/cache";
import { supabaseServer } from "../supabase/server";

const DASHBOARD = "/dashboard";

export async function createBlog(data: BlogFormSchemaType) {
  const { ["content"]: excludedKey, ...blog } = data;
  const supabase = await supabaseServer();

  const resultBlog = await supabase
    .from("blog")
    .insert(blog)
    .select("id")
    .single();
  if (resultBlog.error) {
    return JSON.stringify(resultBlog);
  } else {
    const result = await supabase
      .from("blog_content")
      .insert({ id: resultBlog.data.id!, content: data.content });

    return JSON.stringify(result);
  }
}

export async function readBlog() {
  const supabase = await supabaseServer();
  return supabase
    .from("blog")
    .select("*")
    .order("created_at", { ascending: true });
}

export async function deleteBlogById(blogId: string) {
  const supabase = await supabaseServer();
  const result = await supabase.from("blog").delete().eq("id", blogId);
  revalidatePath(DASHBOARD);
  return JSON.stringify(result);
}

export async function updateBlogById(blogId: string, data: BlogFormSchemaType) {
  const supabase = await supabaseServer();
  const result = await supabase.from("blog").update(data).eq("id", blogId);
  revalidatePath(DASHBOARD);
  revalidatePath("/blog/" + blogId);
  return JSON.stringify(result);
}

export async function readBlogContentById(blogId: string) {
  const supabase = await supabaseServer();

  return supabase
    .from("blog")
    .select("*.blog_content(*)")
    .eq("id", blogId)
    .single();
}
