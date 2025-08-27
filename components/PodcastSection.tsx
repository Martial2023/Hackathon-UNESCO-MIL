"use client"

import { Heart, Headphones, PlayCircle, Clock, Calendar, User, ArrowRight } from "lucide-react"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import Link from "next/link"
import Image from "next/image"

const podcasts = [
  {
    id: 1,
    episode: "Episode No: 01",
    title: "Fighting Fake News in the Digital Age",
    author: "InfoWise Team",
    duration: "45 min",
    date: "22 Feb 2025",
    likes: "12.4k",
    views: "2.1k",
    image: "/clientmanager.jpg",
  },
  {
    id: 2,
    episode: "Episode No: 02",
    title: "How to Spot Online Scams Effortlessly",
    author: "InfoWise AI",
    duration: "38 min",
    date: "24 Feb 2025",
    likes: "9.8k",
    views: "1.6k",
    image: "/clientmanager.jpg",
  },
  {
    id: 3,
    episode: "Episode No: 03",
    title: "The Power of Media Literacy for Youth",
    author: "UNESCO x InfoWise",
    duration: "52 min",
    date: "25 Feb 2025",
    likes: "8.5k",
    views: "1.2k",
    image: "/clientmanager.jpg",
  },
]

export default function PodcastSection() {
  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-800 dark:text-white">
              Featured <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Podcasts</span>
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-3">
              Discover engaging podcasts on fake news, scams, and digital literacy — powered by InfoWise.
            </p>
          </div>
          <Button asChild variant="outline" className="mt-6 md:mt-0 rounded-2xl">
            <Link href="/podcasts">
              More Episodes <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Podcast Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {podcasts.map((podcast) => (
            <Link key={podcast.id} href={`/podcasts/${podcast.id}`}>
              <Card
                key={podcast.id}
                className="p-0 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 dark:bg-zinc-800 grid grid-cols-3 gap-0 items-center"
              >
                <div className="col-span-1 relative w-full h-full flex-1/2 rounded-4xl shadow-xl">
                  <Image
                    src={podcast.image}
                    alt={podcast.title}
                    fill
                    className="object-cover rounded-tr-4xl rounded-br-4xl"
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors rounded-tr-4xl rounded-br-4xl cursor-pointer">
                    <PlayCircle className="w-12 h-12 text-white" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 flex-1/2 col-span-2">
                  <span className="text-sm text-orange-500 font-medium">{podcast.episode}</span>
                  <h3 className="text-lg font-bold text-zinc-800 dark:text-white mt-2">{podcast.title}</h3>

                  <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 mt-3 space-x-4">
                    <User className="w-4 h-4" />
                    <span>{podcast.author}</span>
                  </div>

                  <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 mt-2 space-x-4">
                    <Clock className="w-4 h-4" />
                    <span>{podcast.duration}</span>
                    <Calendar className="w-4 h-4 ml-4" />
                    <span>{podcast.date}</span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-5">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-zinc-600 dark:text-zinc-300">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span>{podcast.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-zinc-600 dark:text-zinc-300">
                        <Headphones className="w-4 h-4" />
                        <span>{podcast.views}</span>
                      </div>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl shadow-2xl">
                      Quiz
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          ))}

          <div
            className="w-full h-full flex items-center justify-center"
          >
            <Button asChild variant="outline" className="mt-6 md:mt-0 rounded-2xl w-7/10 p-4">
              <Link href="/podcasts">
                More Episodes <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}