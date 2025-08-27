'use client'
import { useRouter } from "next/navigation";
import { signOut } from "./auth-client";

const router = useRouter();
export async function handleSignOut () {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in")
        }
      }
    });
  };