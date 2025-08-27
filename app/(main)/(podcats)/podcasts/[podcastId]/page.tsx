'use client'
import { getPodcastById } from '@/app/(actions)/actions'
import MinLoader from '@/components/MinLoader'
import { Button } from '@/components/ui/button'
import { generateAiQuiz } from '@/lib/AIAnalysisFunction'
import { PodcastType, QuizQuestion } from '@/lib/types'
import { User, Clock, Calendar, Heart, Headphones, Loader, PodcastIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const page = () => {
  const params = useParams()
  const podcastId = params.podcastId as string

  const [podcast, setPodcast] = useState<PodcastType>()
  const [loadingPodcast, setLoadingPodcast] = useState<boolean>(false)
  const [quiz, setQuiz] = useState<QuizQuestion[]>([])
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [loadingQuiz, setLoadingQuiz] = useState(false)
  const [selected, setSelected] = useState<string | null>(null) // réponse cliquée

  const fetchPodcast = async () => {
    try {
      setLoadingPodcast(true)
      if (!podcastId) return
      const response = await getPodcastById({ podcastId })
      setPodcast(response)
    } catch {
      toast.error("Failed to fetch podcast")
    } finally {
      setLoadingPodcast(false)
    }
  }

  const generateQuiz = async () => {
    try {
      setLoadingQuiz(true)
      const res = await generateAiQuiz({
        description: podcast?.description || '',
        transcription: podcast?.transcription || ''
      })
      setQuiz(res.questions)
      setCurrent(0)
      setScore(0)
      setFinished(false)
      setSelected(null)
    } catch {
      toast.error("Quiz generation failed")
    } finally {
      setLoadingQuiz(false)
    }
  }

  const handleAnswer = (choice: string) => {
    if (!quiz[current]) return
    setSelected(choice)

    const isCorrect = choice === quiz[current].answer
    if (isCorrect) {
      setScore(prev => prev + 1)
    }

    // attendre 1s pour montrer le vert/rouge avant de passer
    setTimeout(() => {
      if (current + 1 < quiz.length) {
        setCurrent(prev => prev + 1)
        setSelected(null)
      } else {
        setFinished(true)
      }
    }, 1100)
  }

  useEffect(() => {
    fetchPodcast()
  }, [podcastId])

  // Progress bar
  const progress = quiz.length > 0 ? ((current + 1) / quiz.length) * 100 : 0

  const extractYoutubeId = (url: string): string | null => {
    const regExp = /^.*(youtu\.be\/|v=|embed\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }

  return (
    <main className='min-h-screen p-4 pt-20 bg-zinc-50 dark:bg-zinc-900'>
      {
        loadingPodcast ? (
          <div className='flex flex-col justify-center items-center min-h-screen w-full'>
            <MinLoader />
            <p className='text-center text-zinc-600 dark:text-zinc-400'>Loading podcast...</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto'>
            <div className='col-span-1 md:col-span-2 rounded-xl overflow-hidden shadow-lg'>
              {podcast?.videoUrl?.includes("youtube.com") || podcast?.videoUrl?.includes("youtu.be") ? (
                <iframe
                  width="100%"
                  height="420"
                  src={`https://www.youtube.com/embed/${extractYoutubeId(podcast.videoUrl)}`}
                  title={podcast?.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-xl shadow-lg"
                  onEnded={generateQuiz}
                />
              ) : (
                <video
                  className="w-full h-[420px] object-cover rounded-xl"
                  controls
                  src={podcast?.videoUrl}
                  poster={podcast?.thumbnailUrl || '/default-thumbnail.png'}
                  onEnded={generateQuiz}
                />
              )}
            </div>

            <div className="col-span-1 p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-lg w-full">
              <h3 className="text-2xl font-bold text-zinc-800 dark:text-white">{podcast?.title}</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-300">{podcast?.description}</p>

              <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 mt-4 space-x-4">
                <User className="w-4 h-4" />
              </div>
              <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 mt-2 space-x-4">
                <Clock className="w-4 h-4" />
                <span>~14 min</span>
                <Calendar className="w-4 h-4 ml-4" />
                <span>{podcast && podcast.updatedAt ? new Date(podcast.updatedAt).toLocaleDateString() : ''}</span>
              </div>

              <div className="flex flex-col items-center mt-6 gap-3">
                <div className="flex items-center space-x-4">
                  <Heart className="w-4 h-4 text-red-500" />
                  <Headphones className="w-4 h-4" />
                </div>
                <Button
                  size="sm"
                  onClick={generateQuiz}
                  disabled={loadingQuiz}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl shadow-xl w-full"
                >
                  {loadingQuiz ? <Loader className="size-6 mr-2 animate-spin" /> : "Start Quiz"}
                </Button>
              </div>
            </div>
          </div>
        )
      }

      {
        loadingQuiz && (
          <div className='my-12 max-w-3xl mx-auto flex flex-col items-center justify-center'>
            <MinLoader />
            <p className='text-center text-zinc-600 dark:text-zinc-400'>Loading quiz...</p>
          </div>
        )
      }

      <div className='my-12 max-w-3xl mx-auto'>
        {quiz.length > 0 && !finished && (
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-xl">
            {/* Progress bar */}
            <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2 mb-6">
              <div
                className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <h3 className="text-xl font-semibold mb-4">
              Question {current + 1}/{quiz.length}
            </h3>
            <p className="mb-6 text-zinc-700 dark:text-zinc-300 text-wrap">{quiz[current].question}</p>
            <div className="flex flex-col gap-3">
              {quiz[current].choices.map((c, i) => {
                const isCorrect = c === quiz[current].answer
                const isSelected = selected === c

                return (
                  <Button
                    key={i}
                    variant="outline"
                    disabled={!!selected} // on ne peut plus cliquer après sélection
                    className={`justify-start transition-colors ${selected
                      ? isCorrect
                        ? "bg-green-500 text-white"
                        : isSelected
                          ? "bg-red-500 text-white"
                          : ""
                      : ""
                      }`}
                    onClick={() => handleAnswer(c)}
                  >
                    {c}
                  </Button>
                )
              })}
            </div>
            <p className="mt-6 text-sm text-orange-600">Score: {score}</p>
          </div>
        )}

        {finished && (
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-xl text-center">
            <h3 className="text-2xl font-bold">Quiz Finished 🎉</h3>
            <p className="mt-4 text-lg">Your score: {score}/{quiz.length}</p>
            {score < quiz.length && (
              <Button onClick={generateQuiz} className="mt-6 bg-orange-500 text-white">
                Retry Similar Questions
              </Button>
            )}
          </div>
        )}

        <div className='w-full p-4 px-6 flex items-center justify-center'>
          <Button className='text-white w-full mx-auto flex items-center justify-center rounded-xl shadow-lg'>
            <Link href={'/podcasts'} className='text-white w-full flex items-center justify-center'>
              <PodcastIcon className='w-4 h-4 mr-2' />
              More videos
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

export default page