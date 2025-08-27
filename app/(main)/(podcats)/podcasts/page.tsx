'use client'
import { getPodcasts } from '@/app/(actions)/actions';
import MinLoader from '@/components/MinLoader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { categories } from '@/lib/categories';
import { PodcastType } from '@/lib/types';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import debounce from 'lodash.debounce'
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { Calendar, Clock, Headphones, Heart, PlayCircle, PodcastIcon, Send, User } from 'lucide-react';

const PAGE_SIZE = 100
const page = () => {
  const [loading, setLoading] = useState(false);
  const [podcasts, setPodcasts] = useState<PodcastType[]>([]);
  const [query, setQuery] = useState<string>("");
  const [pageIndex, setPageIndex] = useState(1)

  const debouncedSearch = debounce((value: string) => {
    setQuery(value)
  }, 400)

  const handleGetPodcasts = async () => {
    try {
      setLoading(true);
      const newResults = await getPodcasts({
        search: query,
        page: pageIndex,
        pageSize: PAGE_SIZE
      })

      setPodcasts(prev => {
        // fusionner en évitant les doublons (basé sur id)
        const all = [...prev, ...newResults]
        const unique = Array.from(new Map(all.map(p => [p.id, p])).values())
        return unique
      })
    } catch (error) {
      toast.error("Error fetching podcasts");
    } finally {
      setLoading(false);
    }
  }

  const updateResultType = (label: string) => {
    // reset résultats + page
    setPodcasts([]);
    setPageIndex(1);

    setQuery((prev) => {
      const parts = prev.split(/\s+/).filter(Boolean);
      const has = parts.includes(label);

      if (has) {
        return parts.filter((p) => p !== label).join(' ');
      } else {
        return label
      }
    });
  }

  // Recharger quand query change → reset page à 1
  useEffect(() => {
    setPodcasts([])
    setPageIndex(1)
  }, [query])

  // Charger quand query ou pageIndex change
  useEffect(() => {
    handleGetPodcasts();
  }, [query, pageIndex])

  // Gestion du scroll infini
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        !loading
      ) {
        setPageIndex(prev => prev + 1)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [loading])

  return (
    <main className='min-h-screen p-4 pt-16'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-4">InfoWise Videos</h1>
        <p className="text-lg text-gray-700 dark:text-gray-100">
          Dive into InfoWise: discover captivating podcasts, exclusive interviews, and stories that illuminate the world — listen, learn, and be inspired.
        </p>
      </div>

      <div className='w-full flex-col gap-2 flex items-center justify-center my-2 mb-10'>
        <Input
          className='w-full max-w-md rounded-full p-2 h-10'
          type='text'
          placeholder='Search...'
          onChange={(e) => debouncedSearch(e.target.value)}
        />

        <div className="flex items-center justify-center w-full mt-4 gap-2 flex-wrap">
          <Button
            variant={query.includes("ALL") ? 'default' : 'outline'}
            onClick={() => updateResultType("")}
            className={query.includes("ALL") ? "text-white" : ""}
          >
            <PodcastIcon className="w-4 h-4 mr-2" />
            All
          </Button>
          {categories.map((category) => {

            return (
              <Button
                key={category.label}
                variant={query.includes(category.label) ? 'default' : 'outline'}
                onClick={() => updateResultType(category.label)}
                className={query.includes(category.label) ? "text-white" : ""}
              >
                {category.icon}
                {category.label}
              </Button>
            )
          })}
        </div>
      </div>

      {
        podcasts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {
              podcasts.map((podcast, idx) => (
                <Link key={podcast.id} href={`/podcasts/${podcast.id}`}>
                  <Card
                    key={podcast.id}
                    className="p-0 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 dark:bg-zinc-800 grid grid-cols-3 gap-0 items-center"
                  >
                    <div className="col-span-1 relative w-full h-full flex-1/2 rounded-4xl shadow-xl">
                      <Image
                        src={podcast.thumbnailUrl || "/default-thumbnail.png"}
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
                      <span className="text-sm text-orange-500 font-medium">Episode No: {idx + 1}</span>
                      <h3 className="text-lg font-bold text-zinc-800 dark:text-white mt-2">{podcast.title}</h3>

                      <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 mt-3 space-x-4">
                        <User className="w-4 h-4" />
                        <p className='line-clamp-1'>{podcast.description}</p>
                      </div>

                      <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 mt-2 space-x-4">
                        <Clock className="w-4 h-4" />
                        <span>14</span>
                        <Calendar className="w-4 h-4 ml-4" />
                        <span>{new Date(podcast.updatedAt).toLocaleDateString()}</span>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-5">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1 text-zinc-600 dark:text-zinc-300">
                            <Heart className="w-4 h-4 text-red-500" />
                            <span>12</span>
                          </div>
                          <div className="flex items-center space-x-1 text-zinc-600 dark:text-zinc-300">
                            <Headphones className="w-4 h-4" />
                            <span>12</span>
                          </div>
                        </div>
                        <Button size="sm" className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl shadow-2xl">
                          Quiz
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))
            }

            <div
              className="w-full h-full flex items-center justify-center"
            >
              <Button asChild variant="outline" className="mt-6 md:mt-0 rounded-2xl w-7/10 p-4">
                <Link href="/upload">
                  Publish your episodes <Send className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        ) : !loading && (
          <div className='w-full flex flex-col items-center justify-center'>
            <PodcastIcon className='size-8 text-zinc-500' />
            <p className='text-zinc-500'>No podcasts found</p>
          </div>
        )
      }

      {
        loading && (
          <div className="flex items-center justify-center w-full mt-8">
            <MinLoader />
          </div>
        )
      }

      <div className='my-12'>

      </div>

    </main>
  )
}

export default page