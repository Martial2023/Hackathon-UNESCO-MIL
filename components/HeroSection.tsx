'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Shield, Brain, Sparkles, HatGlasses, Podcast } from 'lucide-react'

// Animated background particles component
const AnimatedParticles = () => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-orange-400/30 rounded-full"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        opacity: 0
                    }}
                    animate={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    )
}

// Animated brain/AI visualization component
const AIVisualization = () => {
    return (
        <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
            {/* Main circular container */}
            <motion.div
                className="relative w-80 h-80 lg:w-96 lg:h-96"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            >
                {/* Outer ring */}
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-orange-500/30 dark:border-orange-400/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />

                {/* Middle ring */}
                <motion.div
                    className="absolute inset-4 rounded-full border border-amber-500/20 dark:border-amber-400/20"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />

                {/* Inner gradient circle */}
                <motion.div
                    className="absolute inset-8 rounded-full bg-gradient-to-br from-orange-500/20 via-amber-500/20 to-red-500/20 dark:from-orange-400/20 dark:via-amber-400/20 dark:to-red-400/20 backdrop-blur-sm"
                    animate={{
                        background: [
                            "linear-gradient(45deg, rgba(249, 115, 22, 0.2), rgba(245, 158, 11, 0.2), rgba(239, 68, 68, 0.2))",
                            "linear-gradient(45deg, rgba(245, 158, 11, 0.2), rgba(239, 68, 68, 0.2), rgba(249, 115, 22, 0.2))",
                            "linear-gradient(45deg, rgba(239, 68, 68, 0.2), rgba(249, 115, 22, 0.2), rgba(245, 158, 11, 0.2))"
                        ]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />

                {/* Central brain icon */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    <Podcast className="w-16 h-16 text-orange-600 dark:text-orange-400" />
                </motion.div>

                {/* Floating icons */}
                <motion.div
                    className="absolute top-4 right-4"
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Shield className="w-6 h-6 text-green-500" />
                </motion.div>

                <motion.div
                    className="absolute bottom-4 left-4"
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                    <Sparkles className="w-6 h-6 text-amber-500" />
                </motion.div>

                {/* Connection lines */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-px bg-gradient-to-b from-transparent via-orange-400/50 to-transparent"
                        style={{
                            height: '40px',
                            left: '50%',
                            top: '20px',
                            transformOrigin: 'bottom center',
                            transform: `translateX(-50%) rotate(${i * 60}deg)`
                        }}
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            scaleY: [0, 1, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </motion.div>
        </div>
    )
}

const HeroSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut" as const,
            },
        },
    }


    return (
        <section
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-orange-50/50 to-amber-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
            role="banner"
            aria-label="InfoWise Hero Section"
        >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-amber-500/5 to-red-500/5 dark:from-orange-400/5 dark:via-amber-400/5 dark:to-red-400/5" />

            {/* Animated particles */}
            <AnimatedParticles />

            {/* Main content container */}
            <div className="relative z-10 container mx-auto px-6 py-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Text content */}
                    <motion.div
                        className="text-center lg:text-left space-y-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div className="space-y-6" variants={itemVariants}>
                            <motion.h1
                                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight"
                                variants={itemVariants}
                            >
                                <span className="block text-slate-900 dark:text-white">
                                    Protect Your
                                </span>
                                <span className="block bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 bg-clip-text text-transparent dark:from-orange-400 dark:via-amber-400 dark:to-red-400">
                                    Mind
                                </span>
                                <span className="block text-slate-900 dark:text-white">
                                    with InfoWise
                                </span>
                            </motion.h1>

                            <motion.h2
                                className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-600 dark:text-slate-300"
                                variants={itemVariants}
                            >
                                AI-powered detection and education to fight misinformation and scams.
                            </motion.h2>

                            <motion.p
                                className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                                variants={itemVariants}
                            >
                                InfoWise helps you detect fake news and online frauds instantly while
                                educating you with interactive podcasts, videos, and quizzes. Stay informed, stay safe.
                            </motion.p>
                        </motion.div>
                        
                        <div className="w-6/10 bg-background dark:bg-zinc-900 flex items-center rounded-full border p-1 shadow-sm">
                            <div className="flex -space-x-3">
                                <img
                                    className="ring-background rounded-full ring-2"
                                    src="/clientmanager.jpg"
                                    width={40}
                                    height={40}
                                    alt="Avatar 01"
                                />
                                <img
                                    className="ring-background rounded-full ring-2"
                                    src="/clientmanager.jpg"
                                    width={40}
                                    height={40}
                                    alt="Avatar 02"
                                />
                                <img
                                    className="ring-background rounded-full ring-2"
                                    src="/clientmanager.jpg"
                                    width={40}
                                    height={40}
                                    alt="Avatar 03"
                                />
                                <img
                                    className="ring-background rounded-full ring-2"
                                    src="/clientmanager.jpg"
                                    width={40}
                                    height={40}
                                    alt="Avatar 04"
                                />
                            </div>
                            <Button
                                variant="secondary"
                                className="text-muted-foreground hover:text-foreground flex items-center justify-center rounded-full bg-transparent px-3 text-xs shadow-none hover:bg-transparent"
                            >
                                +3
                            </Button>
                        </div>

                    </motion.div>

                    {/* AI Visualization */}
                    <motion.div
                        className="flex justify-center lg:justify-end"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                    >
                        <AIVisualization />
                    </motion.div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent dark:from-slate-900/50 pointer-events-none" />
        </section>
    )
}

export default HeroSection