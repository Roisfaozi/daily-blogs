import { readBlogContentById } from "@/lib/actions/blogs";
import EditForm from "./components/EditForm";

export default async function Page({ params }: { params: { id: string } }) {
  const { data: blog } = await readBlogContentById(params.id);
  return <EditForm blog={blog} />;
}
