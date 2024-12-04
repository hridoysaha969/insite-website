"use client";
import { supabase } from "@/config/Supabase_Client";
import { useEffect, useState } from "react";

function useUser() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const catchUser = async () => {
    setIsLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setCurrentUser(user ?? null);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!supabase) return;

    catchUser();
  }, [supabase]);

  return { currentUser, isLoading };
}

export default useUser;
