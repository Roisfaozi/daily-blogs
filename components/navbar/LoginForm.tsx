"use client";
import { supabase } from "@/lib/supabase/client";
import { usePathname } from "next/navigation";
import { SiGithub } from "react-icons/si";
import { Button } from "../ui/button";

export default function LoginForm() {
  const pathname = usePathname();

  const handleLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: location.origin + "auth/callback?next=" + pathname,
      },
    });
  };

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={handleLogin}
    >
      <SiGithub /> Login
    </Button>
  );
}
