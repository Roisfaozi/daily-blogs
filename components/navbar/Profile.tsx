"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUserStore } from "@/lib/store/user";
import { supabase } from "@/lib/supabase/client";
import { DashboardIcon, LockOpen1Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import ManageBiling from "../stripe/ManageBiling";
import { Button } from "../ui/button";

export default function Profile() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const handleLoout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const isAdmin = user?.role === "admin";
  const isSub = user?.subscription_status;

  return (
    <Popover>
      <PopoverTrigger>
        <Image
          src={user?.image_url || ""}
          alt={user?.display_name || ""}
          width={50}
          height={50}
          className="rounded-full ring-2 ring-green-500"
        />
      </PopoverTrigger>
      <PopoverContent className="p-2 space-y-3 divide-y">
        <div className="px-4 txet-sm">
          <p>{user?.display_name}</p>
          <p>{user?.email}</p>
        </div>
        {isAdmin && (
          <Link href="/dashboard" className="block">
            <Button
              variant="ghost"
              className="w-full flex items-center justify-between"
            >
              Dashboard
              <DashboardIcon />
            </Button>
          </Link>
        )}
        {!isAdmin && isSub && (
          <ManageBiling customerId={user.stripe_customer_id!} />
        )}
        <Button
          variant="ghost"
          className="w-full flex items-center justify-between"
          onClick={handleLoout}
        >
          Logout
          <LockOpen1Icon />
        </Button>
      </PopoverContent>
    </Popover>
  );
}
