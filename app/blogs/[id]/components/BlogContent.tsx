"use client";
import MarkdownPreview from "@/components/navbar/markdown/MarkdownPreview";
import { Database } from "@/lib/types/supabase";
import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState } from "react";
import { BlogContentLoading } from "./BlogLoading";

export default function BlogContent({ blogId }: { blogId: string }) {
  const [blog, setBlog] = useState<{
    content: string | null;
    created_at: string;
    blog_id: string;
  } | null>();

  const [loading, setLoading] = useState(false);

  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const readBlogContent = async () => {
    setLoading(true);

    const { data } = await supabase
      .from("blog_content")
      .select("*")
      .eq("blog_id", blogId)
      .single();
    setBlog(data);
    setLoading(false);
  };
  useEffect(() => {
    readBlogContent();
  }, []);

  if (loading) {
    return <BlogContentLoading />;
  }

  return <MarkdownPreview className="sm:px-10" content={blog?.content || ""} />;
}
