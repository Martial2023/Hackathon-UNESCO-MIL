"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HatGlasses, LogIn, LogOut, Menu, Moon, Send, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "./ThemeToggle";
import { UserButton } from "./UserButton";
import { useCurrentUser } from "@/lib/useCurrentUser";

export default function Navbar() {
    const user = useCurrentUser()
    const [mounted, setMounted] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 25) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        setMounted(true);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    if (!mounted) return null;

    const navLinks = [
        { name: "Learn", href: "/podcasts" },
        { name: "Fake News Detector", href: "/fake-news-ai" },
        { name: "Scam Shield", href: "/scam-shield" },
        { name: "About", href: "/about" }
    ];

    return (
        <header
            className={`fixed p-4 top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-zinc-900"
                : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className={`text-xl font-bold items-center ${isScrolled ? 'flex' : 'flex'}`}>
                                <HatGlasses className="w-5 h-5 text-orange-500 mr-1" />
                                <span className="dark:text-white">Info</span>
                                <span className="text-orange-500">Wise</span>
                            </h2>
                        </motion.div>
                    </Link>

                    <motion.nav
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="hidden md:flex items-center space-x-1"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${link.href === "/"
                                    ? "text-orange-600 dark:text-orange-400"
                                    : "text-gray-700 dark:text-gray-300"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.nav>

                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="hidden md:flex items-center space-x-2"
                    >
                        <ThemeToggle />
                        {
                            user ? (
                                <div className="flex items-center gap-2">

                                    <Link
                                        href={'/upload'}
                                        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-orange-600 dark:text-orange-400}`}
                                    >
                                        <Send className="w-4 h-4 inline-block mr-1" />
                                        Publish
                                    </Link>
                                    <UserButton />
                                </div>
                            ) : (
                                <>
                                    <Button variant="outline" className="dark:text-white" asChild>
                                        <Link href="/sign-in">Sign in</Link>
                                    </Button>

                                    <Button className="dark:text-white" asChild>
                                        <Link href="/sign-up">Sign up</Link>
                                    </Button>
                                </>
                            )
                        }



                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="md:hidden flex items-center"
                    >
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button className="text-xl font-semibold bg-orange-500 text-primary items-center gap-2 flex lg:hidden p-2 cursor-pointer hover:bg-orange-500/80"
                                    id='landing_nav'
                                >
                                    <Menu className='text-white' />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[65vw] sm:w-[350px] max-w-[340px] p-3 dark:bg-zinc-900">
                                <SheetTitle className=""></SheetTitle>
                                <div className="flex flex-col h-full">
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-xl font-bold flex items-center">
                                            <HatGlasses className="w-5 h-5 text-orange-500 mr-1" />
                                            <span className="dark:text-white">Info</span>
                                            <span className="text-orange-500">Wise</span>
                                        </h2>
                                    </div>

                                    <nav className="flex flex-col space-y-4">
                                        {navLinks.map((link) => (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                className={`px-4 py-3 text-xl font-medium rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-zinc-800 ${link.href === "/"
                                                    ? "text-orange-600 dark:text-orange-400 bg-zinc-100 dark:bg-zinc-700"
                                                    : "text-zinc-700 dark:text-zinc-300"
                                                    }`}
                                                onClick={() => {
                                                    const closeNav = document.getElementById("landing_nav");
                                                    if (closeNav) {
                                                        closeNav.click()
                                                    }
                                                }}
                                            >
                                                {link.name}
                                            </Link>
                                        ))}
                                    </nav>

                                    <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800">
                                        <div className="flex flex-col space-y-3">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                                className="rounded-full"
                                                aria-label="Toggle theme"
                                            >
                                                {theme === "dark" ? (
                                                    <Sun className="h-5 w-5" />
                                                ) : (
                                                    <Moon className="h-5 w-5" />
                                                )}
                                            </Button>

                                            {
                                                user ? (
                                                    <div className="flex items-center gap-2">

                                                        <Link
                                                            href={'/upload'}
                                                            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-orange-600 dark:text-orange-400}`}
                                                        >
                                                            <Send className="w-4 h-4 inline-block mr-1" />
                                                            Publish
                                                        </Link>
                                                        <UserButton />
                                                    </div>
                                                ) : (
                                                    <>
                                                        <Button variant="outline" className="dark:text-white" asChild>
                                                            <Link href="/sign-in">Sign in</Link>
                                                        </Button>

                                                        <Button className="dark:text-white" asChild>
                                                            <Link href="/sign-up">Sign up</Link>
                                                        </Button>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </motion.div>
                </div>
            </div>
        </header>
    );
}