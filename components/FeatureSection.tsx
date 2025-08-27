import { BookOpenCheck, Newspaper, ShieldAlert, Zap, Link as LinkIcon } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import Link from 'next/link'

const FeatureSection = () => {
    return (
        <section className="py-20 bg-white dark:bg-zinc-900 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5 dark:opacity-3">
                <div className="absolute top-10 left-1/4 w-32 h-32 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full blur-xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-sm font-medium mb-6">
                        <Zap className="w-4 h-4 mr-2" />
                        Core Features
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-zinc-800 dark:text-white mb-6">
                        The power of <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">InfoWise</span> at your fingertips
                    </h2>
                    <p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto">
                        Detect misinformation and scams while learning through interactive podcasts, videos, and AI-powered quizzes.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {/* Feature 1 */}
                    <div className="group hover:-translate-y-2 transition-all duration-300">
                        <Card className="p-8 text-center h-full hover:shadow-2xl transition-all duration-500 dark:bg-zinc-800 dark:border-zinc-700 border-0 shadow-lg bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <BookOpenCheck className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-zinc-800 dark:text-white mb-4">
                                    Educational Podcasts & Quizzes
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                                    Listen to engaging podcasts and test your knowledge with interactive AI-powered quizzes to strengthen media literacy.
                                </p>
                                <div className="flex justify-center space-x-2">
                                    <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-xs font-medium">
                                        Audio
                                    </span>
                                    <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-xs font-medium">
                                        Quiz
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Feature 2 */}
                    <div className="group hover:-translate-y-2 transition-all duration-300">
                        <Card className="p-8 text-center h-full hover:shadow-2xl transition-all duration-500 dark:bg-zinc-800 dark:border-zinc-700 border-0 shadow-lg bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Newspaper className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-zinc-800 dark:text-white mb-4">
                                    Fake News Detector
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                                    Paste a link or text and let InfoWise instantly analyze and give you a reliability score with clear explanations.
                                </p>
                                <div className="flex justify-center space-x-2">
                                    <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-xs font-medium">
                                        Verify
                                    </span>
                                    <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-xs font-medium">
                                        AI
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Feature 3 */}
                    <div className="group hover:-translate-y-2 transition-all duration-300">
                        <Card className="p-8 text-center h-full hover:shadow-2xl transition-all duration-500 dark:bg-zinc-800 dark:border-zinc-700 border-0 shadow-lg bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <ShieldAlert className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-zinc-800 dark:text-white mb-4">
                                    Scam Detector
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                                    Detect online scams and fraud attempts quickly, with practical tips and trusted resources to stay protected.
                                </p>
                                <div className="flex justify-center space-x-2">
                                    <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-xs font-medium">
                                        Security
                                    </span>
                                    <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-xs font-medium">
                                        Protection
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center mt-16">
                    <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                        Ready to strengthen your digital resilience with InfoWise?
                    </p>
                    <Button asChild className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3">
                        <Link href="/get-started">
                            <LinkIcon className="mr-2 w-5 h-5" />
                            Get Started
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default FeatureSection