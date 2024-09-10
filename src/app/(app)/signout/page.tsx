"use client";
import { getAuth, signOut } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignOut() {
  const params = useSearchParams();
  const router = useRouter();
  const auth = getAuth();

  const redirectPath = params.get("next");

  signOut(auth).then(() => {
    console.log(redirectPath);
    router.push(redirectPath || "/");
  });
}
