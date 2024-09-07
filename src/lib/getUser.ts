"use client";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { onAuthChanged } from "./firebase/auth";

export function useUser() {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const unsubscribe = onAuthChanged((authUser) => {
      setUser(authUser);
    });

    return unsubscribe;
  }, []);

  return user;
}
