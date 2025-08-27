"use client";

import {
    LogOut,
} from "lucide-react";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { Button } from "./ui/button";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function UserButton() {
    const isMobile = true;
    const user = useCurrentUser()
    const router = useRouter();
    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in")
                }
            }
        });
    };


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="focus:outline-none cursor-pointer">
                    <Avatar className="h-9 w-9 rounded-full object-cover">
                        <AvatarImage
                            src={user?.image || ""}
                            alt={user?.name || "user"}
                        />
                        <AvatarFallback className="rounded-full">
                            {user?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="min-w-56 rounded-xl shadow-xl z-[1000]"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={8}
            >
                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={handleSignOut}
                >
                    <Button variant={"destructive"} className="w-full">
                        <LogOut className="mr-2 h-4 w-4 text-white" />
                        <span>Se déconnecter</span>
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
