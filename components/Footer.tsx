"use client"

import { Facebook, Twitter, Linkedin, Mail, HatGlasses } from "lucide-react"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-bold flex items-center">
                            <HatGlasses className="w-7 h-7 text-orange-500 mr-1" />
                            <span className="dark:text-white">Info</span>
                            <span className="text-orange-500">Wise</span>
                        </h2>
                        <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-sm max-w-xs">
                            AI-powered platform to detect misinformation & scams while empowering youth with podcasts, videos, and quizzes.
                        </p>
                    </div>

                    {/* Menu */}
                    <div>
                        <h3 className="text-lg font-semibold text-zinc-800 dark:text-white mb-4">Menu</h3>
                        <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 text-sm">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/learn">Learn</Link></li>
                            <li><Link href="/fake-news">Fake News Detector</Link></li>
                            <li><Link href="/scam-shield">Scam Detector</Link></li>
                            <li><Link href="/podcasts">Podcasts</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-semibold text-zinc-800 dark:text-white mb-4">Resources</h3>
                        <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 text-sm">
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/faq">FAQ</Link></li>
                            <li><Link href="/privacy">Privacy Policy</Link></li>
                            <li><Link href="/terms">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-lg font-semibold text-zinc-800 dark:text-white mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <Link href="https://facebook.com" target="_blank" className="text-zinc-600 dark:text-zinc-400 hover:text-orange-500">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link href="https://twitter.com" target="_blank" className="text-zinc-600 dark:text-zinc-400 hover:text-orange-500">
                                <Twitter className="w-5 h-5" />
                            </Link>
                            <Link href="https://linkedin.com" target="_blank" className="text-zinc-600 dark:text-zinc-400 hover:text-orange-500">
                                <Linkedin className="w-5 h-5" />
                            </Link>
                            <Link href="mailto:contact@infowise.ai" className="text-zinc-600 dark:text-zinc-400 hover:text-orange-500">
                                <Mail className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
                    <p>© {new Date().getFullYear()} InfoWise. All rights reserved.</p>
                    <p className="mt-4 md:mt-0">
                        Built by <span className="font-medium text-orange-500">AVADRA Martial</span>
                    </p>
                </div>
            </div>
        </footer>
    )
}