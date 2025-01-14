import { Button } from "@/components/ui/button";
import { readBlogAdmin, updateBlogById } from "@/lib/actions/blogs";
import { EyeOpenIcon, Pencil1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { BlogFormSchemaType } from "../schema";
import DeleteAlert from "./DeleteAlert";
import SwitchForm from "./SwitchForm";

export default async function BlogTable() {
  const { data: blogs } = await readBlogAdmin();
  return (
    <div className="overflow-x-auto">
      <div className="border bg-graident-dark rounded-md sm:w-[900px] md:w-full">
        <div className="grid grid-cols-5 p-5 text-gray-500 border-b">
          <h1 className="cols-span-2">Title</h1>
          <h1>Premium</h1>
          <h2>Publish</h2>
        </div>
        {blogs?.map((blog, index) => {
          const updatePremium = updateBlogById.bind(null, blog.id, {
            is_premium: !blog.is_premium,
          } as BlogFormSchemaType);

          const updatePublished = updateBlogById.bind(null, blog.id, {
            is_published: !blog.is_published,
          } as BlogFormSchemaType);
          return (
            <div className="grid grid-cols-5 p-5" key={index}>
              <h1 className="cols-span-2">{blog.title}</h1>
              <SwitchForm
                checked={blog.is_premium}
                name="premium"
                onSubmit={updatePremium}
              />
              <SwitchForm
                checked={blog.is_published}
                name="published"
                onSubmit={updatePublished}
              />
              <Actions id={blog.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

const Actions = ({ id }: { id: string }) => {
  return (
    <div className="flex items-center gap-5 flex-wrap md:flex-row">
      <Link href={"/blogs/" + id}>
        <Button variant="outline" className="flex items-center gap-2">
          <EyeOpenIcon />
          View
        </Button>
      </Link>
      <DeleteAlert blogId={id} />
      <Link href={"/dashboard/blogs/edit/" + id}>
        <Button variant="outline" className="flex items-center gap-2">
          <Pencil1Icon />
          Edit
        </Button>
      </Link>
    </div>
  );
};
