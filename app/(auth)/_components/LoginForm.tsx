'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FcGoogle } from 'react-icons/fc'
import React, { useState } from "react"
import { Loader } from 'lucide-react'
import { signIn } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


const LoginForm = ({
    className,
    ...props
}: React.ComponentProps<"div">) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [isSigninWithEmail, setIsSigninWithEmail] = useState<boolean>(false)
    const [isSigninWithGoogle, setIsSigninWithGoogle] = useState<boolean>(false)
    const router = useRouter()

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    {/* <form className="p-6 md:p-8" onSubmit={handleSignIn}> */}
                    <div className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Connexion</h1>
                                <p className="text-balance text-muted-foreground">
                                    Se connecter à InfoWise
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                    value={email}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full text-white"
                                disabled={loading}
                                onClick={async () => {
                                    setIsSigninWithEmail(true)
                                    await signIn.email(
                                        { email, password },
                                        {
                                            onRequest: () => {
                                                setLoading(true)
                                            },
                                            onResponse: () => {
                                                setLoading(false)
                                            },
                                            onError: (ctx) => {
                                                toast.error(ctx.error.message)
                                                setIsSigninWithEmail(false)
                                            },
                                            onSuccess: () => {
                                                router.push('/upload')
                                            }
                                        }
                                    )
                                }}
                            >
                                {isSigninWithEmail ? <Loader className="animate-spin" /> : "Se connecter"}
                            </Button>

                            <div className='flex items-center gap-2'>
                                <div className='h-[1px] border w-full'></div>
                                <span className='flex-1'>OR</span>
                                <div className='h-[1px] border w-full'></div>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={async () => {
                                        setIsSigninWithGoogle(true)
                                        await signIn.social({
                                            provider: "google",
                                            callbackURL: "/upload"
                                        })
                                    }}
                                    disabled={loading}
                                >
                                    <FcGoogle className='w-6 h-6' />
                                    {isSigninWithGoogle ? <Loader className="animate-spin" /> : <span className="">Se connecter avec Google</span>}
                                </Button>

                            </div>
                            <div className="text-center text-sm">
                                Pas de compte?{" "}
                                <a href="/sign-up" className="underline underline-offset-4">
                                    Créer un compte
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="relative hidden bg-muted md:block">
                        <img
                            src="/clientmanager.jpg"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginForm