import { useSession } from "@/lib/auth-client";

export const useCurrentUser = () => {
  const data = useSession();

  const user = data.data?.user;

  // return { user, isLoading: isPending };
  return user;
};