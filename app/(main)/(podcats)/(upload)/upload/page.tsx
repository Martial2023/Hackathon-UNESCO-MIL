'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { generateReactHelpers } from '@uploadthing/react'

import MediaUploaderComponent from '@/components/MediaUploaderComponent'
import SelectCategoryComponent from '@/components/SelectCategoryComponent'
import { PublishPodcast } from '@/app/(actions)/actions'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Loader, Podcast, Send, FileVideo, Link2 } from 'lucide-react'
import { getVideoTranscription } from '@/lib/AIAnalysisFunction'
import { set } from 'lodash'

const { uploadFiles } = generateReactHelpers();

export default function UploadPodcastPage() {
  const router = useRouter()

  const [topic, setTopic] = useState("Education")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [transcription, setTranscription] = useState<string>("")
  const [video, setVideo] = useState<File | null>(null)
  const [videoLink, setVideoLink] = useState("")
  const [thumbnail, setThumbnail] = useState<File[]>([])
  const [thumbnailLink, setThumbnailLink] = useState("")
  const [isPublishing, setIsPublishing] = useState(false)

  const extractYoutubeId = (url: string): string | null => {
    const regExp = /^.*(youtu\.be\/|v=|embed\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handlePublish = async () => {
    if (!title || !description || (!video && !videoLink) || thumbnail.length === 0) {
      toast.error("Please fill in all required fields.")
      return
    }

    try {
      setIsPublishing(true)

      let finalVideoUrl = videoLink
      if (video) {
        const uploadedVideo = await uploadFiles('video', { files: [video] });
        finalVideoUrl = uploadedVideo[0].ufsUrl
      }

      let finalThumbnailUrl = thumbnailLink
      if (thumbnail.length > 0) {
        const uploadedThumb = await uploadFiles('image', { files: thumbnail });
        finalThumbnailUrl = uploadedThumb[0].ufsUrl
      }

      let videoUrlForTranscription = finalVideoUrl;
      if(videoUrlForTranscription.includes("youtube.com") || videoUrlForTranscription.includes("youtu.be")){
        videoUrlForTranscription = `https://www.youtube.com/embed/${extractYoutubeId(videoUrlForTranscription)}`;
      }
      const videoTranscription = await getVideoTranscription(videoUrlForTranscription);
      setTranscription(videoTranscription);

      await PublishPodcast({
        title,
        description,
        videoUrl: finalVideoUrl,
        thumbnailUrl: finalThumbnailUrl,
        topic,
        transcription
      })

      toast.success("Podcast published successfully!")
      router.push('/podcasts')

    } catch (error) {
      console.error(error)
      toast.error("Error publishing podcast")
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-10 bg-zinc-50 dark:bg-zinc-900">
      {/* Header */}
      <h2 className="text-3xl font-bold flex items-center gap-2 text-zinc-800 dark:text-white mb-2 mt-10">
        <Podcast className="text-orange-500" /> Upload Podcast
      </h2>

      {/* Form Card */}
      <div className="w-full max-w-3xl rounded-2xl bg-white dark:bg-zinc-800 p-6 shadow-lg border dark:border-zinc-700 space-y-6">

        {/* Title */}
        <Input
          disabled={isPublishing}
          placeholder="Title of your video..."
          className="rounded-xl p-4 dark:bg-zinc-900"
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Topic */}
        <SelectCategoryComponent category={topic} setCategory={setTopic} />

        {/* Description */}
        <Textarea
          disabled={isPublishing}
          placeholder="Description of your video..."
          className="rounded-xl p-4 dark:bg-zinc-900 resize-none"
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Video Input */}
        <Tabs defaultValue="video_file" className="w-full">
          <TabsList className="w-full grid grid-cols-2 rounded-xl">
            <TabsTrigger value="video_file" className="flex items-center gap-2">
              <FileVideo className="w-4 h-4" /> Upload File
            </TabsTrigger>
            <TabsTrigger value="video_url" className="flex items-center gap-2">
              <Link2 className="w-4 h-4" /> Video URL
            </TabsTrigger>
          </TabsList>

          <TabsContent value="video_file">
            <div className="w-full p-4 border rounded-xl dark:border-zinc-700">
              <Input
                type="file"
                accept="video/*"
                disabled={isPublishing}
                onChange={(e) => setVideo(e.currentTarget.files?.[0] ?? null)}
              />
            </div>
          </TabsContent>

          <TabsContent value="video_url">
            <div className="w-full p-4 border rounded-xl dark:border-zinc-700">
              <Input
                placeholder="https://your-video-link.com"
                disabled={isPublishing}
                onChange={(e) => setVideoLink(e.target.value)}
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Thumbnail */}
        <MediaUploaderComponent setMediaFiles={setThumbnail} label="Thumbnail" />

        {/* Publish Button */}
        <div className="pt-4">
          <Button
            className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 font-semibold shadow-md hover:shadow-lg transition-all"
            disabled={isPublishing}
            onClick={handlePublish}
          >
            {isPublishing ? (
              <Loader className="animate-spin w-5 h-5 text-white" />
            ) : (
              <>Publish <Send className="ml-2 w-4 h-4" /></>
            )}
          </Button>
        </div>
      </div>
    </main>
  )
}