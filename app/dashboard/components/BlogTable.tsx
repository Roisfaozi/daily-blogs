import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { EyeOpenIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

export default function BlogTable() {
  return (
    <div className="overflow-x-auto">
      <div className="border bg-graident-dark rounded-md w-[900px] md:w-full">
        <div className="grid grid-cols-5 p-5 text-gray-500 border-b">
          <h1 className="cols-span-2">Title</h1>
          <h1>Premium</h1>
          <h2>Publish</h2>
        </div>
        <div className="grid grid-cols-5 p-5">
          <h1 className="cols-span-2">Blog Title</h1>
          <Switch checked={false} />
          <Switch checked={true} />
          <Actions />
        </div>
      </div>
    </div>
  );
}

const Actions = () => {
  return (
    <div className="flex items-center gap-5 flex-wrap">
      <Button variant="outline" className="flex items-center gap-2">
        <EyeOpenIcon />
        View
      </Button>
      <Button variant="outline" className="flex items-center gap-2">
        <TrashIcon />
        Delete
      </Button>
      <Button variant="outline" className="flex items-center gap-2">
        <Pencil1Icon />
        Edit
      </Button>
    </div>
  );
};