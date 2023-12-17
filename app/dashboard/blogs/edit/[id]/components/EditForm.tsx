"use client";

import BlogFrom from "@/app/dashboard/components/BlogForm";
import { BlogFormSchemaType } from "@/app/dashboard/schema";
import { toast } from "@/components/ui/use-toast";
import { updateBlogDetailById } from "@/lib/actions/blogs";
import { IBlogDetail } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function EditForm({ blog }: { blog: IBlogDetail | null }) {
  const router = useRouter();
  const handleEdit = async (data: BlogFormSchemaType) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    const result = await updateBlogDetailById(blog?.id!, data);
    const { error } = JSON.parse(result);
    if (error?.message) {
      toast({
        title: "Failed to update blog",
        description: (
          <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
            <code className="text-white">{error.message}</code>
          </pre>
        ),
      });
    } else {
      toast({
        title: "Successfully updated " + data.title,
      });

      router.push("/dashboard");
    }
  };

  return <BlogFrom blog={blog} onHandlesubmit={handleEdit} />;
}
