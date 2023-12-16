"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { deleteBlogById } from "@/lib/actions/blogs";
import { cn } from "@/lib/utils";
import { TrashIcon } from "@radix-ui/react-icons";
import { useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function DeleteAlert({ blogId }: { blogId: string }) {
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await deleteBlogById(blogId);
      const { error } = JSON.parse(result);

      if (error?.message) {
        toast({
          title: "Failed to delete blog",
          description: (
            <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
              <code className="text-white">{error.message}</code>
            </pre>
          ),
        });
      } else {
        toast({
          title: "Successfully delete blog ",
        });
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <TrashIcon />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <form onSubmit={onSubmit}>
            <Button className="flex items-center gap-2">
              <AiOutlineLoading3Quarters
                className={cn("animate-spin", { hidden: !isPending })}
              />
              Continue
            </Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
