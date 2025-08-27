"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, ShieldAlert, ShieldCheck, ExternalLink, Shield } from "lucide-react"
import MinLoader from "@/components/MinLoader"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { getScamShield } from "@/lib/AIAnalysisFunction"

export default function ScamShieldPage() {
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<{ status: string, message: string } | null>(null)

    const handleAnalyze = async () => {
        try {
            if (!input.trim()) return
            setLoading(true)
            setResult(null)

            const response = await getScamShield(input.trim())
            setResult(response)
        } catch {
            toast.error("Error while checking the resources")
        }finally{
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen p-6 pt-20">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6 w-full flex items-center justify-center flex-col">
                    <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent">
                        Scam Shield
                    </h1>
                    <Shield className="size-8 text-primary" />
                </div>
                <p className="text-center text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto mb-10">
                    Protect yourself against online scams. Paste a link, an email, or any suspicious text below and let our system analyze its risk level.
                </p>

                <div className="flex flex-col gap-3 items-center justify-center mb-8">
                    <Textarea
                        value={input}
                        disabled={loading}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Collez ici un lien ou un texte..."
                        className="flex-1 max-w-2xl rounded-xl border-zinc-300 dark:border-zinc-700 resize-none max-h-46"
                    />
                    <Button
                        onClick={handleAnalyze}
                        disabled={loading}
                        className="w-full max-w-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl px-6 shadow-lg hover:shadow-xl"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin w-5 h-5" />
                        ) : (
                            "Analyse"
                        )}
                    </Button>
                </div>

                {
                    loading && (
                        <div className="w-full flex items-center justify-center">
                            <MinLoader />
                        </div>
                    )
                }

                {/* Résultats */}
                {result && (
                    <div className="mt-8 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-6 transition-all">
                        <div className="flex items-center gap-3 mb-4">
                            {result.status === "Arnaque confirmée" ? (
                                <ShieldAlert className="w-8 h-8 text-red-500" />
                            ) : (
                                <ShieldCheck className="w-8 h-8 text-orange-500" />
                            )}
                            <h3 className="text-2xl font-bold">{result.status}</h3>
                        </div>
                        <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                            {result.message}
                        </p>

                        {/* Ressources pratiques */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
                                Ressources utiles
                            </h4>
                            <div className="p-4 bg-gradient-to-r from-red-100 to-orange-100 dark:from-zinc-700 dark:to-zinc-600 rounded-xl space-y-3">
                                <a
                                    href="https://www.internet-signalement.gouv.fr/"
                                    target="_blank"
                                    className="flex items-center text-sm text-red-600 dark:text-red-300 hover:underline"
                                >
                                    Signaler une fraude officielle <ExternalLink className="ml-2 w-4 h-4" />
                                </a>
                                <a
                                    href="/guides/protection"
                                    className="flex items-center text-sm text-orange-600 dark:text-orange-300 hover:underline"
                                >
                                    Conseils pour se protéger <ExternalLink className="ml-2 w-4 h-4" />
                                </a>
                                <a
                                    href="/assistance"
                                    className="flex items-center text-sm text-zinc-700 dark:text-zinc-300 hover:underline"
                                >
                                    Contacter l’assistance <ExternalLink className="ml-2 w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}