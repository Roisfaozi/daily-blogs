"use client";
import { toast } from "@/components/ui/use-toast";
import BlogFrom from "../../components/BlogForm";
import { BlogFormSchemaType } from "../../schema";

export default function page() {
  const handleCreate = (data: BlogFormSchemaType) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-fullrounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };
  return <BlogFrom onHandlesubmit={handleCreate} />;
}
