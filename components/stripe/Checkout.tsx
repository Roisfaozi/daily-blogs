"use client";
import { checkout } from "@/lib/actions/stripe";
import { useUserStore } from "@/lib/store/user";
import { cn } from "@/lib/utils";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import { loadStripe } from "@stripe/stripe-js";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import LoginForm from "../navbar/LoginForm";
import { Button } from "../ui/button";
export default function Checkout() {
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);
  const [isPending, startTransition] = useTransition();

  const handleCheckout = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    startTransition(async () => {
      const data = JSON.parse(
        await checkout(user?.email, location.origin + pathname),
      );
      const result = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHED_KEY!,
      );
      await result?.redirectToCheckout({ sessionId: data.id });
    });
  };

  if (!user?.id) {
    return (
      <div className="flex items-center h-9 w-full justify-center gap-2">
        <LoginForm /> to Read
      </div>
    );
  }
  return (
    <form
      onSubmit={handleCheckout}
      className={cn("h-96 w-full flex items-center justify-center", {
        "animate-pulse": isPending,
      })}
    >
      <Button
        variant="ghost"
        className="flex flex-col p-10 gap-5 ring-2 ring-green-500"
      >
        <span className="flex items-center gap-2 text-2xl font-bold text-green-500">
          <LightningBoltIcon
            className={cn(
              "w-5 h-5",
              !isPending ? "animate-bounce" : "animate-spin",
            )}
          />
          Upgrade to Pro
        </span>
        <span>Unlock blog content</span>
      </Button>
    </form>
  );
}
