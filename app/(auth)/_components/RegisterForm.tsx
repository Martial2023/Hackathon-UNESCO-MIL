'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FcGoogle } from 'react-icons/fc'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn, signUp } from "@/lib/auth-client"
import { toast } from "sonner"
import { Loader } from "lucide-react"



const RegisterForm = ({
    className,
    ...props
}: React.ComponentProps<"div">) => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [isSignupWithEmail, setIsSignupWithEmail] = useState<boolean>(false)
    const [isSignupWithGoogle, setIsSignupWithGoogle] = useState<boolean>(false)
    const router = useRouter()

    const registerWithEmail = async () => {
        try {
            setIsSignupWithEmail(true)
            if (password !== passwordConfirmation) {
                toast.error("Passwords do not match")
                setIsSignupWithEmail(false)
                return
            }
            await signUp.email({
                email,
                name: email,
                password,
                callbackURL: '/upload',
                fetchOptions: {
                    onResponse: () => {
                        setLoading(false)
                    },
                    onRequest: () => {
                        setLoading(true)
                    },
                    onError: (ctx) => {
                        toast.error(ctx.error.message)
                    },
                    onSuccess: async () => {
                        router.push("/upload")
                    }
                }
            })
        } catch (error) {
            toast.error(error as string)
        } finally {
            setIsSignupWithEmail(false)
        }
    }


    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <div className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Register</h1>
                                <p className="text-balance text-muted-foreground">
                                    Create an InfoWise account
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Confirm Password</Label>
                                </div>
                                <Input
                                    id="passwordConfirmation"
                                    type="password"
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    value={passwordConfirmation}
                                    required
                                />
                            </div>

                            <Button
                                className="w-full text-white"
                                disabled={loading}
                                onClick={registerWithEmail}
                            >
                                {isSignupWithEmail ? <Loader className="h-4 w-4 animate-spin " /> : "Sign up"}
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
                                        setIsSignupWithGoogle(true)
                                        await signIn.social({
                                            provider: "google",
                                            callbackURL: "/upload"
                                        })
                                    }}
                                    disabled={loading}
                                >
                                    <FcGoogle className='w-6 h-6' />
                                    {isSignupWithGoogle ? <Loader className="h-4 w-4 animate-spin " /> : <span className="">S&apos;inscrire avec Google</span>}
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Vous avez déjà un compte?{" "}
                                <a href="/sign-in" className="underline underline-offset-4">
                                    Login
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

export default RegisterForm