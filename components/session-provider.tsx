"use client";

import { useUserStore } from "@/lib/store/user";
import { supabase } from "@/lib/supabase/client";
import { useEffect } from "react";

export default function SessionProvider() {
  const setUser = useUserStore((state) => state.setUser);

  const readUserSession = async () => {
    const { data } = await supabase.auth.getSession();
    const { data: userInfo } = await supabase
      .from("users")
      .select("*")
      .eq("id", data.session?.user.id)
      .single();
    setUser(userInfo);
  };

  useEffect(() => {
    readUserSession();
  }, []);

  return <></>;
}
