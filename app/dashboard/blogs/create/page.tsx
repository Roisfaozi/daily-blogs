"use client";
import { toast } from "@/components/ui/use-toast";
import { createBlog } from "@/lib/actions/blogs";
import { useRouter } from "next/navigation";
import BlogFrom from "../../components/BlogForm";
import { BlogFormSchemaType } from "../../schema";

export default function Page() {
  const router = useRouter();
  const handleCreate = async (data: BlogFormSchemaType) => {
    const result = await createBlog(data);
    const { error } = JSON.parse(result);

    if (error?.message) {
      toast({
        title: "Failed to create blog",
        description: (
          <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
            <code className="text-white">{error.message}</code>
          </pre>
        ),
      });
    } else {
      toast({
        title: "Successfully created " + data.title,
      });
      router.push("/dashboard");
    }
  };
  return <BlogFrom onHandlesubmit={handleCreate} />;
}
