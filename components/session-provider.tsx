"use client";

import { useUserStore } from "@/lib/store/user";
import { supabase } from "@/lib/supabase/client";
import { useEffect } from "react";

export default function SessionProvider() {
  const setUser = useUserStore((state) => state.setUser);

  const readUserSession = async () => {
    const { data } = await supabase.auth.getSession();
    setUser(data.session?.user);
  };

  useEffect(() => {
    readUserSession();
  }, []);

  return <></>;
}
