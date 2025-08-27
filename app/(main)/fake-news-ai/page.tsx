"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, ShieldCheck, ShieldAlert, ExternalLink, SpeakerIcon } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import MinLoader from "@/components/MinLoader"
import { toast } from "sonner"
import { fakeNewsAnalysis } from "@/lib/AIAnalysisFunction"
import Link from "next/link"

export default function Page() {
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<{ score: number, message: string } | null>(null)

    const handleAnalyze = async () => {
        try {
            if (!input.trim()) return
            setLoading(true)
            setResult(null)

            const response = await fakeNewsAnalysis(input.trim())
            setResult(response)
        } catch {
            toast.error("Error while checking the ressources")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen p-6 pt-20">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6 w-full flex items-center justify-center flex-col">
                    <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
                        Fake News Detector
                    </h1>
                    <SpeakerIcon className="size-8 text-primary" />
                </div>
                <p className="text-center text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto mb-10">
                    Paste a link or text below to analyze its reliability.
                    The analysis uses quick checks first, then falls back to a fact-checking API if uncertain.
                </p>

                {/* Input zone */}
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
                            "Analyser"
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

                {result && (
                    <div className="mt-8 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-6 transition-all">
                        <div className="flex items-center gap-3 mb-4">
                            {result.score > 50 ? (
                                <ShieldAlert className="w-8 h-8 text-red-500" />
                            ) : (
                                <ShieldCheck className="w-8 h-8 text-green-500" />
                            )}
                            <h3 className="text-2xl font-bold">
                                Score de risque : {result.score}%
                            </h3>
                        </div>
                        <p className="text-zinc-700 dark:text-zinc-300 mb-6">
                            {result.message}
                        </p>

                        {/* Suggestion éducative */}
                        <div className="p-4 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-zinc-700 dark:to-zinc-600 rounded-xl flex items-center justify-between">
                            <div>
                                <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">
                                    Découvrez comment reconnaître cette technique de manipulation
                                </h4>
                                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                                    Accédez à une ressource vidéo/audio éducative liée à ce type de désinformation.
                                </p>
                            </div>
                            <Button asChild variant="outline" className="rounded-xl">
                                <Link href="/educatif" className="flex items-center">
                                    Voir la ressource <ExternalLink className="ml-2 w-4 h-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}