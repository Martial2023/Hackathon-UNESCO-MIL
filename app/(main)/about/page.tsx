"use client"
import React from "react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Shield, Brain, Sparkles, Target, Users, Globe, Zap, Award, Star, Heart, BookOpen, HatGlasses } from "lucide-react"

export default function AboutPage() {
    const team = [
        { 
            name: "Martial Avadra", 
            role: "Founder & AI Research Lead", 
            img: "/team/martial.jpg", 
            nationality: "Beninese",
            description: "Pioneering AI solutions for digital literacy and misinformation detection"
        },
        { 
            name: "Koubra Gaby", 
            role: "Senior Data Scientist", 
            img: "/team/martial.jpg", 
            nationality: "Beninese",
            description: "Building intelligent algorithms that protect users from digital threats"
        },
        { 
            name: "John Smith", 
            role: "Backend Architect", 
            img: "/team/martial.jpg", 
            nationality: "Beninese",
            description: "Ensuring robust, scalable infrastructure for global impact"
        },
        { 
            name: "Sarah Lee", 
            role: "Lead UX Designer", 
            img: "/team/martial.jpg", 
            nationality: "Beninese",
            description: "Crafting intuitive experiences that make learning engaging and accessible"
        },
    ]

    const features = [
        {
            icon: Brain,
            title: "AI-Powered Intelligence",
            description: "Advanced machine learning algorithms analyze content patterns and detect misinformation with 95% accuracy",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: Shield,
            title: "Comprehensive Protection",
            description: "Multi-layered defense system protecting users from scams, phishing, and sophisticated digital threats",
            color: "from-orange-500 to-red-500"
        },
        {
            icon: BookOpen,
            title: "Interactive Education",
            description: "Engaging podcasts, gamified quizzes, and immersive content that makes media literacy fun and memorable",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: Globe,
            title: "Global Impact",
            description: "Building a worldwide community of informed digital citizens equipped to combat misinformation",
            color: "from-green-500 to-emerald-500"
        }
    ]

    const stats = [
        { number: "50K+", label: "Users Protected Daily", icon: Users, color: "from-orange-500 to-red-500" },
        { number: "1M+", label: "Content Pieces Analyzed", icon: Zap, color: "from-blue-500 to-cyan-500" },
        { number: "95%", label: "Detection Accuracy", icon: Target, color: "from-green-500 to-emerald-500" },
        { number: "24/7", label: "Real-time Protection", icon: Shield, color: "from-purple-500 to-pink-500" }
    ]


    return (
        <main className="min-h-screen">
            <div className="relative z-10 px-6 pt-20 pb-16">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-20">
                        <div className="mx-auto mb-8 relative inline-block">
                            
                        </div>
                        
                        <h1 className="text-6xl md:text-7xl lg:text-6xl font-bold mb-6">
                            <span className="block text-slate-900 dark:text-white">About</span>
                            <span className="block bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 bg-clip-text text-transparent dark:from-orange-400 dark:via-amber-400 dark:to-red-400">
                                InfoWise
                            </span>
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-5xl mx-auto leading-relaxed">
                            Pioneering the future of digital literacy through cutting-edge AI technology, 
                            comprehensive education, and community-driven protection against misinformation across Africa and beyond.
                        </p>
                    </div>

                    {/* Stats Section */}
                    <section className="mb-24">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="text-center group hover:scale-105 transition-transform duration-300"
                                >
                                    <div className="relative mx-auto w-20 h-20 mb-6 hover:scale-110 transition-transform duration-300">
                                        <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity`} />
                                        <div className="absolute inset-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/50">
                                            <stat.icon className="w-8 h-8 text-slate-700 dark:text-slate-300" />
                                        </div>
                                    </div>
                                    <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                                        {stat.number}
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 font-medium">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Mission Section */}
                    <section className="mb-24">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
                                        Our Mission
                                    </h2>
                                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                                        We envision a digital Africa where every citizen possesses the knowledge and tools 
                                        to navigate information landscapes safely. InfoWise stands at the forefront of this 
                                        digital revolution, combining advanced AI technology with culturally-aware educational 
                                        approaches to create an informed, resilient continental community.
                                    </p>
                                </div>
                                
                                <div className="space-y-6">
                                    {[
                                        { text: "Democratize access to media literacy across Africa", icon: Globe },
                                        { text: "Combat misinformation through cutting-edge AI technology", icon: Brain },
                                        { text: "Build safer, more informed digital communities", icon: Shield },
                                        { text: "Empower citizens with critical thinking skills", icon: Star }
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center space-x-4 p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-orange-200/50 dark:border-orange-800/50 hover:scale-105 hover:translate-x-2 transition-all duration-300"
                                        >
                                            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <item.icon className="w-5 h-5 text-white" />
                                            </div>
                                            <p className="text-slate-700 dark:text-slate-300 font-medium">{item.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative">
                                <div className="relative w-full h-96 bg-gradient-to-br from-orange-500/20 via-amber-500/20 to-red-500/20 rounded-3xl overflow-hidden backdrop-blur-sm border border-orange-200/50 dark:border-orange-800/50">
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/15 via-amber-500/15 to-red-500/15" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="relative">
                                            <div className="w-32 h-32 border-2 border-orange-400/30 rounded-full flex items-center justify-center">
                                                <HatGlasses className="w-16 h-16 text-orange-600 dark:text-orange-400" />
                                            </div>
                                        </div>
                                        
                                        {/* Static mission icons */}
                                        {[Brain, Shield, Globe, Star].map((Icon, index) => (
                                            <div
                                                key={index}
                                                className="absolute"
                                                style={{
                                                    top: `${20 + Math.sin(index * Math.PI / 2) * 30}%`,
                                                    left: `${20 + Math.cos(index * Math.PI / 2) * 30}%`
                                                }}
                                            >
                                                <div className="w-8 h-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg flex items-center justify-center border border-orange-200/50">
                                                    <Icon className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section className="mb-24">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
                                What Makes Us Different
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto">
                                Our innovative approach combines advanced technology with African-centered design 
                                to deliver unparalleled protection and education tailored for our continent.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="group hover:scale-105 hover:-translate-y-2 transition-all duration-500"
                                >
                                    <Card className="h-full p-8 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl relative overflow-hidden">
                                        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color}`} />
                                        
                                        <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative hover:rotate-12`}>
                                            <feature.icon className="w-8 h-8 text-white" />
                                            <div className={`absolute -inset-2 bg-gradient-to-r ${feature.color} rounded-2xl opacity-20`} />
                                        </div>
                                        
                                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
                                            {feature.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Team Section */}
                    <section>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">
                                Meet Our Visionaries
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto">
                                A passionate team of Beninese innovators united by a shared vision for a 
                                digitally literate Africa, leading the fight against misinformation across the continent.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                            {team.map((member, index) => (
                                <div
                                    key={index}
                                    className="group hover:scale-105 hover:-translate-y-2 transition-all duration-500"
                                >
                                    <Card className="p-8 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl text-center h-full relative overflow-hidden">
                                        <div className="relative inline-block mb-6 hover:scale-110 transition-transform duration-300">
                                            <Avatar className="w-24 h-24 mx-auto ring-4 ring-orange-200/50 dark:ring-orange-800/50 relative">
                                                <AvatarImage src={member.img} alt={member.name} />
                                                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-orange-500 to-red-500 text-white">
                                                    {member.name.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                        
                                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">
                                            {member.name}
                                        </h3>
                                        <p className="text-orange-600 dark:text-orange-400 font-semibold mb-2 hover:scale-105 transition-transform duration-300">
                                            {member.role}
                                        </p>
                                        <div className="flex items-center justify-center">
                                            <span className="px-3 py-1 text-sm rounded-full border border-orange-200/50 dark:border-orange-800/50">
                                                {member.nationality}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                            {member.description}
                                        </p>

                                        {/* Specialty Badge */}
                                        <div className="mt-2 inline-flex items-center space-x-1">
                                            <Star className="w-4 h-4 text-orange-500" />
                                            <span className="text-xs text-slate-500 dark:text-slate-400">Core Team Member</span>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>

                        {/* Call to Action */}
                        <div className="text-center">
                            <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 rounded-3xl p-12 text-white relative overflow-hidden max-w-4xl mx-auto hover:scale-105 transition-transform duration-500">
                                {[Shield, Brain, Globe, Heart].map((Icon, index) => (
                                    <div
                                        key={index}
                                        className="absolute opacity-20"
                                        style={{
                                            top: `${20 + index * 15}%`,
                                            left: `${10 + index * 20}%`
                                        }}
                                    >
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                ))}
                                
                                <div className="relative z-10">
                                    <h3 className="text-3xl md:text-4xl font-bold mb-4">
                                        Join the Digital Revolution in Africa
                                    </h3>
                                    <p className="text-xl opacity-90 max-w-2xl mx-auto mb-6">
                                        Be part of a movement that's empowering African communities with digital literacy, 
                                        fighting misinformation, and building a safer digital future for our continent.
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                                        <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">🌍 Pan-African Impact</span>
                                        <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">🚀 AI Innovation</span>
                                        <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">🛡️ Community Protection</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}